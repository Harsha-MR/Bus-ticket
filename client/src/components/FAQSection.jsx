import React, { useState } from "react";

const FAQSection = () => {
  const [activeTab, setActiveTab] = useState("General");
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const tabs = ["General", "Ticket-related", "Payment", "Cancellation & Refund", "Insurance"];

  const faqData = {
    General: [
      { question: "Can I track the location of my booked bus online?", answer: "Yes, you can track your bus online by using our bus tracking app feature called “Track My Bus”. This feature allows passengers and their families to track the live bus location. You may follow your bus on a map and use the information to plan your trip to the boarding point and to get off at the correct stop. Family and friends may also check the bus position to schedule pick-ups and ensure safety." },
      { question: "What are the advantages of purchasing a bus ticket with getBus?", answer: "There are many advantages to purchasing online bus tickets with getBus. getBus is India’s most trusted bus ticket company, where you can book any type of private or government-owned bus. getBus allows you to find the different types of buses, choose the preferred bus seats, and find your nearest boarding and dropping points. You can also filter the buses based on timings, like morning, evening, etc." },
      { question: "Why book bus tickets online on getBus?", answer: "Booking bus tickets online on getBus is increasingly becoming the preferred choice for travellers due to its numerous advantages over traditional methods. With getBus, customers can book their bus tickets effortlessly from the comfort of their homes, avoiding the inconvenience of standing in long lines at bus stations or travel agencies. Online bus booking offers the luxury of comparing different bus schedules and operators and presents various discount offers and exclusive deals, resulting in significant savings." },
      { question: "Do I need to create an account on the getBus site to book my bus ticket?", answer: "No, you don’t have to create an account on the getBus site to book your bus ticket. But it is advisable to make one to accelerate the process next time you want to book bus tickets. Also, getBus has many discounts and offers that you can easily access if you have an account with us." },
    ],
    "Ticket-related": [
      { question: "How can I book bus tickets on getBus?", answer: "Bus ticket Booking is effortless on getBus. To book the bus tickets, go to the main page and enter your source city and destination city in the “From” and “To” fields, respectively. Enter the travel date and hit the search button. Now, you will see the bus list available on the given bus route. You can use the filter option, such as duration, fare, bus type, etc., to rearrange the list accordingly. This makes it easier for customers to book their bus tickets online with getBus." },
      { question: "Can I change the date of my journey after I have booked my bus ticket?", answer: "Yes. You can change the journey date after booking a bus ticket on getBus by clicking the “Reschedule” icon if your travel plan might get interrupted while booking. Bus operators with the “Reschedule icon” next to it offer rescheduling of the bus ticket in case your initially selected date is not viable to travel on." },
    ],
    Payment: [
      { question: "Is it safe to use my credit or debit card to buy bus tickets on getBus?", answer: "Transactions on getBus are very safe. We employ the best-in-class security and the transactions done are secure. Apart from being certified by Verisign, getBus uses Secure Socket Layers (SSL) data encryption. Using SSL ensures that the information exchanged with us is never transmitted unencrypted, thus protecting the information from being viewed by unauthorized individuals." },
      { question: "Does the owner of the credit card/debit card with which the bus ticket is purchased need to be one of the passengers?", answer: "Not at all! A passenger can use any debit or credit card to pay for the bus ticket, not necessarily their own. However, please note that the passenger in whose name the ticket is booked should carry a proof of his identity (along with the ticket) at the time of boarding the bus." },
    ],
    "Cancellation & Refund": [
      { question: "Can I cancel my bus ticket online?", answer: "Yes you can cancel bus tickets online, Most of the tickets can be canceled online. However, there are some bus tickets that can only be canceled through our call center. However please note that the cancellation fee and cancellation period may differ for specific bus services. Please contact any of our executives for cancellation details on any specific service." },
      { question: "How can I cancel my bus ticket online?", answer: "To cancel the bus ticket online, you need to click on the cancellation link provided on our home page. Enter your ticket number and the e-mail ID that was provided at the time of bus booking and click on cancel ticket." },
    ],
    Insurance: [
      { question: "Details on Insurance", answer: "For details on Insurance of your journey after bus ticket booking, please refer to the Insurance Terms." },
    ],
  };

  return (
    <div className="max-w-[85rem]  pl-[173px] p-4">
      {/* Tabs */}
      <div className="flex border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setExpandedQuestion(null); // Reset expanded question on tab switch
            }}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab ? "border-b-2 border-red-500 text-black" : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* FAQ Content */}
      <div className="h-[24rem] overflow-y-auto border p-4 rounded-lg shadow-lg">
        {faqData[activeTab].map((faq, index) => (
          <div key={index} className="mb-4">
            <div
              onClick={() => setExpandedQuestion(expandedQuestion === index ? null : index)}
              className="flex justify-between items-center p-4 cursor-pointer bg-gray-100 rounded-md"
            >
              <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
              <span className="text-gray-500">
                {expandedQuestion === index ? "-" : "+"}
              </span>
            </div>
            {expandedQuestion === index && (
              <div className="p-4 bg-gray-50 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
