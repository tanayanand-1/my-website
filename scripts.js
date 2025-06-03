document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Menu Toggle ---
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }
  // --- Brand Shrink on Scroll ---
  const brand = document.querySelector('.brand');
  if (brand) {
    window.addEventListener('scroll', () => {
      brand.classList.toggle('shrink', window.scrollY > 50);
    });
  }


  // --- Typed Text Effect ---
  const name = "Manufacturer of Aviation Industry's<br>Most Advanced Ground Support<br>Equipment .";
  const typedElement = document.getElementById("typed-name");
  let index = 0;

  function type() {
    if (index < name.length) {
      const char = name.charAt(index);
      if (char === "<" && name.slice(index, index + 4) === "<br>") {
        typedElement.innerHTML += "<br>";
        index += 4;
      } else {
        typedElement.innerHTML += char;
        index++;
      }
      setTimeout(type, 50);
    }
  }

  if (typedElement) {
    type();
  }
  // --- Tabbed Service Section ---
  const items = document.querySelectorAll("#service-list li");
  const sections = document.querySelectorAll(".service-section");

  items.forEach((item, index) => {
    item.addEventListener("click", () => {
      items.forEach(i => i.classList.remove("active"));
      sections.forEach(s => {
        s.classList.remove("active");
        s.style.display = "none";
      });

      item.classList.add("active");
      const selected = sections[index];
      selected.style.display = "block";
      setTimeout(() => selected.classList.add("active"), 10);
    });
  });

  // --- YouTube Modal Popup ---
  const thumbnails = document.querySelectorAll('.thumbnail');
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  const closeBtn = document.querySelector('.close');

  function closeModal() {
    if (modal && modalVideo) {
      modal.style.display = 'none';
      modalVideo.src = '';
    }
  }

  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
      const videoId = thumbnail.getAttribute('data-video-id');
      if (modal && modalVideo) {
        modalVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        modal.style.display = 'block';
      }
    });
  });

  closeBtn?.addEventListener('click', closeModal);
  window.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });
});
//---------------------------------------------------------------about us//
const cards = document.querySelectorAll('.tools-card');

cards.forEach(card => {
  const header = card.querySelector('.card-header');
  const icon = card.querySelector('.icon');
  const body = card.querySelector('.card-body');

  header.addEventListener('click', () => {
    const isOpen = card.classList.contains('open');

    // Close all cards
    cards.forEach(c => {
      c.classList.remove('open');
      c.querySelector('.icon').textContent = '+';
    });

    // Toggle clicked card only if it wasn't open before and has content
    if (!isOpen && body && body.textContent.trim() !== '') {
      card.classList.add('open');
      icon.textContent = '×';
    }
  });
});

function toggleDropdown(element) {
  element.classList.toggle("active");
}
//-----------------FORM POSTING-----------------------------------------------//
//-----------------------------VALIDATION------------------------------//
document.getElementById("isolatedForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const form = e.target;

  // Validate phone number (exactly 10 digits)
  const phoneInput = form.iso_contactNumber.value.trim();
  if (!/^\d{10,}$/.test(phoneInput)) {
    alert("Phone number must be minimum 10 digits.");
    return;
  }

  // Validate email format
  const email = form.iso_email.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Validate at least one product selected
  const checkedProducts = Array.from(
    form.querySelectorAll('input[name="iso_product"]:checked')
  ).map(input => input.value);

  if (checkedProducts.length === 0) {
    alert("Please select at least one product.");
    return;
  }

  // Prepare payload
  const payload = new URLSearchParams();
  payload.append('company', form.iso_company.value.trim());
  payload.append('contactName', form.iso_contactName.value.trim());
  payload.append('designation', form.iso_designation.value.trim());
  payload.append('contactNumber', phoneInput);
  payload.append('email', email);
  payload.append('documentIntent', form.iso_documentIntent.value);
  checkedProducts.forEach(product => payload.append('products', product));
  payload.append('description', form.iso_description.value.trim());

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzgDzcptUrQua6aEgQZQxkx9KIhn4v6X8FBEjc4GYnqjPDKMICiKSREJ8AjMd2T4Oi8aw/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString()
      }
    );

    const text = await response.text();

    if (text.includes("Success")) {
      alert("Enquiry submitted successfully!\n We will contact you shortly.We usually respond within 24–48 hours");
      form.reset();
     } else {
      alert("Submission failed: " + text);
    }
  } catch (error) {
    alert("Error submitting form. Please try again.");
    console.error(error);
  }
});
//---------------------------------------------------------PRODUCT PAGE--------------------------------------------------------//
document.getElementById("enq_form").addEventListener("submit", function(e) {
  e.preventDefault();

  const checkedProducts = Array.from(document.querySelectorAll('input[name="enq_product"]:checked'))
                               .map(cb => cb.value);

  if (checkedProducts.length === 0) {
    alert("Please select at least one product of interest.");
    return;
  }

  const formData = {
    company: document.getElementById("enq_company").value,
    contactName: document.getElementById("enq_contactName").value,
    designation: document.getElementById("enq_designation").value,
    contactNumber: document.getElementById("enq_contactNumber").value,
    email: document.getElementById("enq_email").value,
    documentIntent: document.getElementById("enq_documentIntent").value,
    products: checkedProducts,
    description: document.getElementById("enq_description").value
  };

  console.log("Form Data Submitted:", formData);
  alert("Thank you! Your enquiry has been submitted.");
  e.target.reset();
});

const products = [
  {
    name: "Vehicle Body Assembly",
    image: "https://via.placeholder.com/400x200?text=Vehicle+Body",
    description: "High-quality body assemblies for commercial and passenger vehicles.",
  },
  {
    name: "Semi-Trailer",
    image: "https://via.placeholder.com/400x200?text=Semi+Trailer",
    description: "Durable semi-trailers designed for long-distance logistics.",
  },
  {
    name: "Custom Trailer",
    image: "https://via.placeholder.com/400x200?text=Custom+Trailer",
    description: "Tailored trailer designs for specific business needs.",
  },
  {
    name: "Transport Container",
    image: "https://via.placeholder.com/400x200?text=Container",
    description: "Robust containers for multi-modal transport solutions.",
  },
];

const productList = document.getElementById("product-list");

products.forEach((product) => {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <div class="product-card-content">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <button class="product-button" onclick="selectProduct('${product.name}')">Select</button>
    </div>`;

  productList.appendChild(card);
});

function selectProduct(name) {
  alert(`You selected: ${name}`);
}

