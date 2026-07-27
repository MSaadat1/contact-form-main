import "./App.css";
import { useState } from "react";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [queryType, setQueryType] = useState("");
  const [message, setMessage] = useState("");
  const [checked, setChecked] = useState(false);
  const [submitForm, setSubmitForm] = useState(false);
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    console.log("I am here");
    e.preventDefault();

    const newErrors = {};
    if (!firstName.trim()) {
      newErrors.firstName = "This field is required!";
    }
    if (!lastName.trim()) {
      newErrors.lastName = "This field is required!";
    }
    if (!email.trim()) {
      newErrors.email = "This field is required!";
    }
    if (!queryType.trim()) {
      newErrors.queryType = "Please select a query type!";
    } else if (!e.target.email.checkValidity()) {
      newErrors.email = "Please enter a valid email address!";
    }
    if (!message.trim()) {
      newErrors.message = "This field is required!";
    }
    if (!checked) {
      newErrors.checked =
        "To submit this form, please consent to being contacted!";
    }
    console.log(newErrors);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setSubmitForm(true);

    setFirstName("");
    setLastName("");
    setEmail("");
    setQueryType("");
    setMessage("");
    setChecked(false);

    setTimeout(() => {
      setSubmitForm(false);
    }, 5000);
  }

  function clearError(field) {
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  }

  return (
    <div className="main-page">
      <div>
        {submitForm && (
          <div className="submit-message">
            <p>☑Message Sent!</p>
            <p>
              Thank you for completing the form. We will be in contact with you!
            </p>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="form-container">
        <h2>Contact Us</h2>
        <div className="full-name">
          <div className="fullName-first">
            <label htmlFor="firstName">First Name ✶</label>
            <input
              id="firstName"
              type="text"
              className={errors.firstName ? "inputError" : ""}
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                clearError("firstName");
              }}
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
          </div>
          <div className="fullName-last">
            <label htmlFor="lastName">Last Name ✶</label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              className={errors.lastName ? "inputError" : ""}
              onChange={(e) => {
                setLastName(e.target.value);
                clearError("lastName");
              }}
            />
            {errors.lastName && <p className="error">{errors.lastName}</p>}
          </div>
        </div>
        <div className="email-container">
          <label htmlFor="email">Email ✶</label>
          <input
            id="email"
            type="email"
            value={email}
            className={errors.email ? "inputError" : ""}
            onChange={(e) => {
              setEmail(e.target.value);
              clearError("email");
            }}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="query-container">
          <label>Query Type ✶</label>
          <div className="query-type">
            <label htmlFor="general">
              <input
                type="radio"
                name="queryType"
                id="general"
                value="General Enquiry"
                checked={queryType === "General Enquiry"}
                onChange={(e) => {
                  setQueryType(e.target.value);
                  clearError("queryType");
                }}
              />
              General Enquiry
            </label>
            <label htmlFor="support">
              <input
                id="support"
                type="radio"
                name="queryType"
                value="Support Request"
                checked={queryType === "Support Request"}
                onChange={(e) => {
                  setQueryType(e.target.value);
                  clearError("queryType");
                }}
              />
              Support Request
            </label>
          </div>
          {errors.queryType && <p className="error">{errors.queryType}</p>}
        </div>
        <div className="message-container">
          <label htmlFor="message">Message ✶</label>
          <textarea
            name=""
            id="message"
            value={message}
            className={errors.message ? "inputError" : ""}
            onChange={(e) => {
              setMessage(e.target.value);
              clearError("message");
            }}
          ></textarea>
          {errors.message && <p className="error">{errors.message}</p>}
        </div>
        <div className="check-container">
          <div className="check-mark">
            <label htmlFor="check">
              <input
                type="checkbox"
                id="check"
                checked={checked}
                onChange={(e) => {
                  setChecked(e.target.checked);
                  clearError("checked");
                }}
              />
              I consent to being contacted by team.
            </label>
          </div>
          <div className="checked-error">
            {errors.checked && <p className="error">{errors.checked}</p>}
          </div>
        </div>
        <div className="submit-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
}

export default App;
