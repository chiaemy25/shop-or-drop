Shop or Drop is a full-stack web application designed to democratize corporate accountability in the fashion industry. By providing real-time sustainability and ethical data, this platform empowers Gen-Z consumers to make informed, value-driven purchasing decisions.

This platform serves as a transparency tool where users can search for global fashion brands to instantly retrieve their ethical "footprint." 

Key Features

Dynamic Brand Search: A custom-engineered search engine that retrieves brand profiles from a JSON-based data structure.

Real-Time Data Rendering: Utilizes Flask (Python) to display ethical metrics 

High-Fidelity UI: Features a luxury-aesthetic interface with dynamic CSS layouts and seamless background video integration.

Technical Stack

Backend: Python, Flask

Frontend: JavaScript (ES6+), HTML5, CSS3 (Flexbox/Grid)

Database: JSON Data Structures

Deployment: PythonAnywhere

Version Control: Git, GitHub

Technical Challenges & Learning

Production Environment Management:
Transitioning from local development to cloud deployment on PythonAnywhere required a deep dive into Linux-based server configurations. I implemented absolute file pathing using the Python os module to ensure backend stability and prevent directory-related errors during data retrieval.

Asset Delivery & Browser Compatibility:
To overcome Safari's strict requirements for video autoplay, I moved large media assets to a GitHub-based CDN. This resolved issues with byte-range (206) requests, ensuring a consistent high-performance experience across all devices and browsers.

About the Founder:
Built by a Computer Science and Public Policy student at Duke University (Robertson Scholar). This project represents a commitment to using technology as a lever for social and environmental change in the fashion industry.
