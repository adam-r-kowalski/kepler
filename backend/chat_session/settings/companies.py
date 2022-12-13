from dataclasses import dataclass
import random
from typing import List


@dataclass
class Company:
    name: str
    info: str
    call_categories: List[str]


# smallest company options menu, for testing
bci_company = Company(
    name = "Brain Chips R Us",
    info = "Brain Chips R Us provides the highest end of consumer brain computer interface (BCI) implants. We are the largest neural interface company on this side of the asteroid belt.",
    call_categories = [
        "malware in BCI implant",
        "chip power and battery issues",
        "medical issues relating to implant",
        "ethics concerns",
    ],
)


hospital = Company(
    name = "St. Bella's Hospital",
    info = "St. Bella's Hospital is a large, state-of-the-art medical facility located in the heart of a bustling city. Our hospital has been serving the community for over 100 years, and we are committed to providing the highest quality care to our patients. We offer a wide range of medical services, including primary care, specialty care, surgical procedures, and emergency services. Our dedicated team of doctors, nurses, and support staff are committed to providing compassionate and personalized care to every patient who comes through our doors. We also have a strong focus on research and innovation, and are constantly working to advance the field of medicine and improve patient outcomes. At St. Bella's Hospital, we strive to provide the best possible care to our patients, and we are proud to be a trusted partner in their healthcare journey.",
    call_categories = [
        "scheduling an appointment",
        "asking for directions to the hospital",
        "inquiring about doctor availability",
        "requesting medical advice or information",
        "reporting a symptom or health concern",
        "requesting a prescription refill",
        "seeking information about health insurance and coverage",
        "asking about billing and payment options",
        "requesting medical records or test results",
        "reporting a negative experience at the hospital",
        "inquiring about the hospital's policies and procedures",
        "seeking mental health services or support",
        "requesting an interpretation or translation service",
        "asking about support groups or patient education programs",
        "seeking information about clinical trials or research studies",
        "requesting disability accommodations or special assistance",
        "reporting a hospital-acquired infection or adverse event",
        "asking about volunteering opportunities at the hospital",
        "requesting a second opinion from a different doctor",
        "seeking information about the hospital's services and facilities",
        "legal inquiries",
    ],
)


bank = Company(
    name = "Big Sky Bank",
    info = "a large, national bank that offers a full range of financial services and products, including checking and savings accounts, loans, and investment options, to individuals, businesses, and institutions, with a focus on providing convenient and accessible banking solutions",
    call_categories = [
        "asking about account balances or recent transactions",
        "requesting information about loan or mortgage rates",
        "reporting a lost or stolen debit or credit card",
        "applying for a new account or credit card",
        "requesting a replacement atm or debit card",
        "seeking information about online or mobile banking services",
        "reporting fraudulent activity on an account",
        "requesting a wire transfer or other type of money transfer",
        "asking about our hours of operation",
        "requesting a change of address or other personal information",
        "seeking advice about investment or retirement options",
        "requesting a stop payment on a check",
        "applying for a loan or mortgage",
        "inquiring about the our services and products",
        "requesting a credit limit increase",
        "reporting a problem with an atm or other bank machine",
        "seeking information about foreign exchange rates",
        "asking about fees or charges on an account",
        "requesting a new checkbook or other banking supplies",
        "seeking information about our policies and procedures",
    ],
)


store = Company(
    name = "Superstore",
    info = "a large, multi-national retail chain that offers a wide variety of products, including clothing, electronics, home goods, and groceries, at competitive prices, with a commitment to providing exceptional customer service and a convenient shopping experience",
    call_categories = [
        "asking about store hours or location",
        "requesting information about a product or service",
        "reporting a problem with a purchase or order",
        "seeking a refund or exchange",
        "requesting a special order or item not currently in stock",
        "asking about the store's return or exchange policy",
        "seeking assistance with a technical issue or product malfunction",
        "requesting a price match or discount",
        "reporting a lost or stolen item",
        "asking about the availability of a certain product or size",
        "seeking information about the store's rewards or loyalty program",
        "requesting a gift card or gift certificate",
        "asking about the store's shipping or delivery options",
        "requesting a rain check or other special offer",
        "seeking information about the store's sales or promotions",
        "requesting a special event or private shopping experience",
        "reporting a problem with the store's website or online ordering system",
        "seeking information about the store's credit or financing options",
        "requesting a special service or installation",
        "asking about the store's policies and procedures",
    ],
)


airline = Company(
    name = "Cloudline Airlines",
    info = "a major airline that operates a global network of flights to destinations around the world, offering a range of fare options and services, such as in-flight entertainment and meals, to meet the needs of its diverse customer base",
    call_categories = [
        "scheduling or changing a flight",
        "requesting a seat assignment or special accommodation",
        "seeking information about flight schedules or routes",
        "asking about the availability of a certain fare or class of service",
        "requesting a refund or cancellation",
        "reporting a lost or damaged bag",
        "seeking information about the airline's loyalty program or rewards",
        "requesting a special meal or other in-flight service",
        "asking about the airline's policies for pets or service animals",
        "requesting a boarding pass or itinerary",
        "reporting a problem with a flight or airport experience",
        "seeking information about the airline's policies for children or infants",
        "requesting a change of address or other personal information",
        "asking about the airline's policies for passengers with disabilities",
        "requesting a standby or upgrade",
        "reporting a problem with the airline's website or online booking system",
        "seeking information about the airline's policies for travel with sports equipment or other oversized items",
        "requesting a boarding pass or itinerary for a connecting flight",
        "asking about the airline's policies for cancellations or delays",
        "seeking information about the airline's policies and procedures",
    ],
)


internet_service_provider = Company(
    name = "ThunderNet Internet",
    info = "a large, national internet service provider that offers high-speed internet, digital TV, and phone services to residential and business customers, with a focus on providing reliable and affordable connectivity and a range of features and options",
    call_categories = [
        "reporting a problem with their internet connection or service",
        "requesting information about internet plans or pricing",
        "seeking assistance with setting up or configuring their home network",
        "asking about the availability of broadband or other high-speed internet services in their area",
        "requesting a change of address or other account information",
        "seeking information about the internet provider's policies for data usage or caps",
        "reporting a problem with the internet provider's website or online billing system",
        "requesting a new router or other equipment",
        "asking about the internet provider's policies for canceling or transferring service",
        "requesting a technician visit or other in-home service",
        "seeking information about the internet provider's policies for parental controls or internet safety",
        "requesting a change of email or password",
        "asking about the internet provider's policies for refunds or credits",
        "seeking information about the internet provider's policies for installation or activation fees",
        "reporting spam or other unwanted emails or messages",
        "requesting information about the internet provider's policies for privacy and security",
        "asking about the internet provider's policies for sharing or transferring data between devices",
        "requesting a temporary suspension or interruption of service",
        "seeking information about the internet provider's policies for data backup or recovery",
        "requesting a copy of the internet provider's terms of service or other legal agreements",
    ],
)


insurance_company = Company(
    name = "Sunshine Insurance Group",
    info = "a major insurance company that provides a variety of personal and commercial insurance products, including auto, home, health, and life insurance, to customers across the country, with a focus on providing comprehensive coverage and exceptional service",
    call_categories = [
        "requesting information about coverage options or policies",
        "reporting a change in personal or contact information",
        "filing a claim",
        "report a fraudulent claim",
        "asking about the status of a claim or payment",
        "requesting a copy of an insurance policy or id card",
        "seeking information about the insurance company's policies for premiums or payments",
        "requesting a change or adjustment to an existing policy",
        "reporting a change in circumstances or eligibility for coverage",
        "seeking information about the insurance company's policies for exclusions or limitations",
        "requesting a quote for a new policy or coverage option",
        "reporting a problem with the insurance company's website or online account system",
        "seeking information about the insurance company's policies for pre-existing conditions or exclusions",
        "requesting a letter of proof of insurance or coverage",
        "asking about the insurance company's policies for cancellations or non-renewals",
        "seeking information about the insurance company's policies for discounts or rewards",
        "requesting assistance with completing or submitting a claim form or other paperwork",
        "reporting a lost or stolen insurance card or policy document",
        "seeking information about the insurance company's policies for appeals or disputes",
        "requesting a change of beneficiaries or other policy details",
        "asking about the insurance company's policies and procedures",
    ],
)


hotel = Company(
    name = "Grand Hotel",
    info = "a luxury hotel chain that operates hotels and resorts around the world, offering elegant accommodations, fine dining, and a range of amenities and services, such as spas and fitness centers, to its discerning guests",
    call_categories = [
        "requesting information about room rates or availability",
        "making a reservation or booking a room",
        "seeking information about the hotel's policies and amenities",
        "requesting a special accommodation or request",
        "asking about the hotel's location or directions",
        "reporting a problem with a reservation or booking",
        "seeking information about the hotel's policies for cancellations or changes",
        "requesting a wake-up call or other in-room service",
        "reporting a problem or concern with the hotel or its facilities",
        "seeking information about the hotel's policies for pets or service animals",
        "requesting a late check-out or early check-in",
        "asking about the hotel's policies for parking or transportation",
        "reporting a lost or stolen item",
        "seeking information about the hotel's policies for children or extra guests",
        "requesting a copy of the hotel's terms and conditions or other legal agreements",
        "asking about the hotel's policies for special events or group reservations",
        "reporting a problem with the hotel's website or online booking system",
        "seeking information about the hotel's policies for refunds or credits",
        "requesting a copy of the hotel's guest directory or other information",
        "asking about the hotel's policies and procedures",
    ],
)


university = Company(
    name = "World University",
    info = "a prestigious, research-intensive university that offers a wide range of undergraduate, graduate, and professional degree programs, as well as opportunities for research, study abroad, and service learning, to a diverse and talented student body",
    call_categories = [
        "requesting information about admissions or enrollment",
        "seeking information about academic programs or courses",
        "making a payment or inquiring about financial aid",
        "reporting a change of personal or contact information",
        "requesting a transcript or other academic record",
        "seeking information about the university's policies and procedures",
        "asking about the availability of housing or campus facilities",
        "reporting a problem with a class or instructor",
        "seeking information about the university's policies for transfer credits or exemptions",
        "requesting a change of major or program",
        "asking about the university's policies for leaves of absence or withdrawals",
        "reporting a problem with the university's website or online systems",
        "seeking information about the university's policies for extracurricular activities or clubs",
        "requesting a copy of the university's student handbook or other guidelines",
        "asking about the availability of tutoring or other academic support services",
        "reporting a problem with campus safety or security",
        "seeking information about the university's policies for internships or job placement",
        "requesting a copy of the university's graduation requirements or course catalog",
        "asking about the availability of on-campus employment or job opportunities",
        "seeking information about the university's policies and procedures",
        "question about student loans",
    ],
)


power_company = Company(
    name = "PowerCo",
    info = "a large, diversified power company that generates, transmits, and distributes electricity and other forms of energy to customers in multiple regions, with a focus on providing reliable, affordable, and sustainable energy solutions and a commitment to environmental responsibility and innovation",
    call_categories = [
        "reporting a power outage or other service interruption",
        "requesting information about billing or payment options",
        "seeking assistance with a power surge or other electrical issue",
        "reporting a problem with a power meter or billing statement",
        "requesting a change of address or other account information",
        "seeking information about the power company's policies for conservation or energy efficiency",
        "requesting a new power outlet or other electrical service",
        "reporting a problem with the power company's website or online account system",
        "seeking information about the power company's policies for service disconnections or terminations",
        "requesting a copy of the power company's terms and conditions or other legal agreements",
        "asking about the power company's policies for refunds or credits",
        "seeking information about the power company's policies for outages or emergency services",
        "requesting a change of name or ownership on the account",
        "reporting a problem with the power company's phone or customer service line",
        "seeking information about the power company's policies for renewable energy or sustainability",
        "requesting a copy of the power company's energy rate or pricing schedule",
        "asking about the power company's policies for power restoration or repair",
        "reporting a problem with a power line or other utility infrastructure",
        "seeking information about the power company's policies for energy conservation or usage",
        "requesting a copy of the power company's policies and procedures",
    ],
)


def get_random_company() -> Company:
    company = random.choice([
        bci_company,
        hospital,
        bank,
        store,
        airline,
        internet_service_provider,
        insurance_company,
        hotel,
        university,
        power_company,
    ])
    return company
