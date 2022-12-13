import random

def month_int_to_string(input: int) -> str:
    """
    
    """
    month_int_to_string = {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',    
        9: 'September', 
        10: 'October',
        11: 'November',
        12: 'December'
    }
    return month_int_to_string[input]

def month_string_to_number(month_string):
    """Convert a string representing a month to a number.
    """
    month_number = {
        'January': 1,
        'February': 2,
        'March': 3,
        'April': 4,
        'May': 5,   
        'June': 6,
        'July': 7,
        'August': 8,
        'September': 9,
        'October': 10,
        'November': 11, 
        'December': 12  
    }   
    return month_number[month_string]

def generate_unique_random_countries() -> list:
    """
    Generates a unique list of 5 random countries.
    """
    countries_list = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Nigeria",
        "Netherlands",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Philippines",
        "Poland",
        "Portugal",
        "Romania",
        "Russia",
        "Rwanda",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Somalia",
        "South Africa",
        "South Korea",
        "Spain",    
        "Sweden",
        "Switzerland",
        "Tajikistan",
        "Tanzania"
    ]
    return random.sample(countries_list, k=10)

def random_integer() -> int:
    """
    Returns a random integer between 0 and 100.
    """
    return random.randint(0, 100)

def random_datetime_generator(start_date, end_date) -> datetime:
    """ 
    Generates a random datetime between two dates.
    """ 
    start_date = datetime.strptime(start_date, '%Y-%m-%d')
    end_date = datetime.strptime(end_date, '%Y-%m-%d')
    return start_date +
    
if __name__ == "__main__":
    print(generate_unique_random_countries())