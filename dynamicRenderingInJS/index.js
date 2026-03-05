
const employees = [
  {
    id: 1,
    name: "Aryan Mehta",
    role: "Frontend Engineer",
    department: "Engineering",
    position: "Senior",
    location: "Mumbai, IN",
    joined: "Jan 2021",
    status: "active",
    image: "https://images.pexels.com/photos/6274712/pexels-photo-6274712.jpeg", // e.g. "images/aryan.jpg"
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "UI/UX Designer",
    department: "Design",
    position: "Lead",
    location: "Bangalore, IN",
    joined: "Mar 2020",
    status: "lead",
    image: "https://images.pexels.com/photos/4420634/pexels-photo-4420634.jpeg",
  },
  {
    id: 3,
    name: "Rohan Verma",
    role: "Backend Engineer",
    department: "Engineering",
    position: "Mid-level",
    location: "Delhi, IN",
    joined: "Jul 2022",
    status: "remote",
    image: "https://images.pexels.com/photos/5378700/pexels-photo-5378700.jpeg",
  },
  {
    id: 4,
    name: "Sneha Iyer",
    role: "Product Manager",
    department: "Product",
    position: "Senior",
    location: "Hyderabad, IN",
    joined: "Nov 2019",
    status: "active",
    image: "https://images.pexels.com/photos/4946515/pexels-photo-4946515.jpeg",
  },
  {
    id: 5,
    name: "Karan Joshi",
    role: "DevOps Engineer",
    department: "Infrastructure",
    position: "Senior",
    location: "Pune, IN",
    joined: "Feb 2021",
    status: "active",
    image: "https://images.pexels.com/photos/4307869/pexels-photo-4307869.jpeg",
  },
  {
    id: 6,
    name: "Ananya Das",
    role: "Data Analyst",
    department: "Analytics",
    position: "Junior",
    location: "Chennai, IN",
    joined: "Aug 2023",
    status: "remote",
    image: "https://images.pexels.com/photos/3454298/pexels-photo-3454298.jpeg",
  },
  {
    id: 7,
    name: "Vivek Nair",
    role: "Full Stack Developer",
    department: "Engineering",
    position: "Lead",
    location: "Kochi, IN",
    joined: "May 2020",
    status: "lead",
    image: "https://images.pexels.com/photos/7116213/pexels-photo-7116213.jpeg",
  },
  {
    id: 8,
    name: "Neha Gupta",
    role: "HR Manager",
    department: "Human Resources",
    position: "Manager",
    location: "Jaipur, IN",
    joined: "Oct 2018",
    status: "active",
    image: "https://images.pexels.com/photos/3586091/pexels-photo-3586091.jpeg",
  },
  {
    id: 9,
    name: "Aditya Rao",
    role: "Android Developer",
    department: "Mobile",
    position: "Mid-level",
    location: "Ahmedabad, IN",
    joined: "Jan 2022",
    status: "onleave",
    image: "https://images.pexels.com/photos/8090137/pexels-photo-8090137.jpeg",
  },
  {
    id: 10,
    name: "Meera Pillai",
    role: "QA Engineer",
    department: "Quality",
    position: "Senior",
    location: "Kolkata, IN",
    joined: "Jun 2021",
    status: "remote",
    image: "https://images.pexels.com/photos/6976943/pexels-photo-6976943.jpeg",
  },
];

const cardGrid = document.getElementById("cardGrid");

employees.forEach((emp) => {
  // card element
  const card = document.createElement("div");
  card.classList.add("card");
 
  card.innerHTML = `
    <span class="card-index">#${String(emp.id).padStart(2, "0")}</span>

    <div class="card-avatar">
    <img src="${emp.image}" alt="${emp.name}" />
    </div>

    <div class="card-name">${emp.name}</div>
    <div class="card-role">${emp.role}</div>

    <div class="card-divider"></div>

    <div class="card-meta">
      <div class="meta-item">
        <span class="meta-key">Position</span>
        <span class="meta-val">${emp.position}</span>
      </div>
      <div class="meta-item">
        <span class="meta-key">Location</span>
        <span class="meta-val">${emp.location}</span>
      </div>
      <div class="meta-item">
        <span class="meta-key">Joined</span>
        <span class="meta-val">${emp.joined}</span>
      </div>
      <div class="meta-item">
        <span class="meta-key">Status</span>
        <span class="badge ${emp.status}">${emp.status}</span>
      </div>
    </div>

    <div class="card-dept">
      DEPT <span>${emp.department}</span>
    </div>
  `;
  cardGrid.appendChild(card);
});
