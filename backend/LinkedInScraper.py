import requests
from lxml import html
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import os
import re

class Institution(object):
    institution_name = None
    website = None
    industry = None
    type = None
    headquarters = None
    company_size = None
    founded = None

    def __init__(self, name=None, website=None, industry=None, type=None, headquarters=None, company_size=None, founded=None):
        self.name = name
        self.website = website
        self.industry = industry
        self.type = type
        self.headquarters = headquarters
        self.company_size = company_size
        self.founded = founded

class Experience(Institution):
    from_date = None
    to_date = None
    description = None
    position_title = None
    duration = None

    def __init__(self, from_date = None, to_date = None, description = None, position_title = None, duration = None, location = None):
        self.from_date = from_date
        self.to_date = to_date
        self.description = description
        self.position_title = position_title
        self.duration = duration
        self.location = location

    def __repr__(self):
        return "{position_title} at {company} from {from_date} to {to_date} for {duration} based at {location}".format( from_date = self.from_date, to_date = self.to_date, position_title = self.position_title, company = self.institution_name, duration = self.duration, location = self.location)

class Scraper(object):
    driver = None

    def is_signed_in(self):
        try:
            self.driver.find_element_by_id("profile-nav-item")
            return True
        except:
            pass
        return False

    def __find_element_by_class_name__(self, class_name):
        try:
            self.driver.find_element_by_class_name(class_name)
            return True
        except:
            pass
        return False

    def __find_element_by_xpath__(self, tag_name):
        try:
            self.driver.find_element_by_xpath(tag_name)
            return True
        except:
            pass
        return False

class Person(Scraper):
    __TOP_CARD = "pv-top-card"
    name = None
    experiences = []
    educations = []
    location = None
    also_viewed_urls = []
    linkedin_url = None

    def __init__(self, linkedin_url=None, name=None, experiences=[], educations=[], driver=None, get=True, scrape=True):
        self.linkedin_url = linkedin_url
        self.name = name
        self.experiences = experiences or []
        self.educations = educations or []

        if driver is None:
            try:
                if os.getenv("CHROMEDRIVER") == None:
                    driver_path = os.path.join(os.path.dirname(__file__), 'drivers/chromedriver')
                else:
                    driver_path = os.getenv("CHROMEDRIVER")

                driver = webdriver.Chrome(driver_path)
            except:
                driver = webdriver.Chrome()

        if get:
            driver.get(linkedin_url)

        self.driver = driver

        if scrape:
            self.scrape()

    def add_experience(self, experience):
        self.experiences.append(experience)

    def time_divide(string):
        duration = re.search("\((.*?)\)", string)

        if duration != None:
            duration = duration.group(0)
            string = string.replace(duration, "").strip()
        else:
            duration = "()"
            string = string + "––()"

        times = string.split("–")
        return (times[0].strip(), times[1].strip(), duration[1:-1])

    def scrape(self, close_on_complete=True):
        if self.is_signed_in():
            self.scrape_logged_in(close_on_complete=close_on_complete)
        else:
            self.scrape_not_logged_in(close_on_complete=close_on_complete)

    def scrape_logged_in(self, close_on_complete=True):
        driver = self.driver
        root = driver.find_element_by_class_name(self.__TOP_CARD)
        self.name = root.find_elements_by_xpath("//section/div/div/div/*/li")[0].text.strip()

        driver.execute_script("window.scrollTo(0, Math.ceil(document.body.scrollHeight/2));")

        _ = WebDriverWait(driver, 3).until(EC.presence_of_element_located((By.ID, "experience-section")))

        # get experience
        exp = driver.find_element_by_id("experience-section")
        for position in exp.find_elements_by_class_name("pv-position-entity"):
            position_title = position.find_element_by_tag_name("h3").text.strip()
            company = position.find_element_by_class_name("pv-entity__secondary-title").text.strip()

            try:
                times = position.find_element_by_class_name("pv-entity__date-range").text.strip()
                times = "\n".join(times.split("\n")[1:])
                from_date, to_date, duration = self.time_divide(times)
            except:
                from_date, to_date, duration = ("Unknown", "Unknown", "Unknown")
            try:
                location = position.find_element_by_class_name("pv-entity__location").text.strip()
            except:
                location = None
            experience = Experience(position_title=position_title, from_date=from_date, to_date=to_date,
                                    duration=duration, location=location)
            experience.institution_name = company
            self.add_experience(experience)

        if close_on_complete:
            driver.close()

    def scrape_not_logged_in(self, close_on_complete=True, retry_limit=10):
        driver = self.driver
        retry_times = 0
        while self.is_signed_in() and retry_times <= retry_limit:
            page = driver.get(self.linkedin_url)
            retry_times = retry_times + 1

        # get name
        self.name = driver.find_element_by_id("name").text.strip()

        # get experience
        exp = driver.find_element_by_id("experience")
        for position in exp.find_elements_by_class_name("position"):
            position_title = position.find_element_by_class_name("item-title").text.strip()
            company = position.find_element_by_class_name("item-subtitle").text.strip()

            try:
                times = position.find_element_by_class_name("date-range").text.strip()
                from_date, to_date, duration = time_divide(times)
            except:
                from_date, to_date, duration = (None, None, None)

            try:
                location = position.find_element_by_class_name("location").text.strip()
            except:
                location = None
            experience = Experience(position_title=position_title, from_date=from_date, to_date=to_date,
                                    duration=duration, location=location)
            experience.institution_name = company
            self.add_experience(experience)


        # get
        if close_on_complete:
            driver.close()

    def __repr__(self):
        return "{name}\n\nExperience\n{exp}\n".format(name=self.name, exp=self.experiences)