import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function CompassionateForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    uspId: "",
    dob: "",
    telephone: "",
    email: "",
    address: "",
    semester: "",
    year: "",
    missedExams: [{ courseCode: "", examDate: "", examTime: "" }],
    campus: "",
    applicationType: {
      compassionate: false,
      aegrotat: false,
      special: false,
    },
    reason: "",
    appDate: "",
    appSignature: "",
    medical: {
      comments: "",
      unable: false,
      impaired: false,
      fine: false,
      medOfficerName: "",
      medOfficerSign: "",
      medDate: "",
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in formData.applicationType) {
      setFormData((prev) => ({
        ...prev,
        applicationType: {
          ...prev.applicationType,
          [name]: checked,
        },
      }));
    } else if (name in formData.medical) {
      setFormData((prev) => ({
        ...prev,
        medical: {
          ...prev.medical,
          [name]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">USP Special Exam / Compassionate / Aegrotat Form</h2>

      {/* Section A */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">Section A: Personal Details</div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label>Full Name</label>
              <input type="text" name="fullName" className="form-control" value={formData.fullName} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label>Title</label>
              <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label>USP ID Number</label>
              <input type="text" name="uspId" className="form-control" value={formData.uspId} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label>Date of Birth</label>
              <input type="date" name="dob" className="form-control" value={formData.dob} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label>Telephone</label>
              <input type="text" name="telephone" className="form-control" value={formData.telephone} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label>Email</label>
              <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
            </div>
            <div className="col-12">
              <label>Postal Address</label>
              <textarea name="address" className="form-control" rows="2" value={formData.address} onChange={handleChange}></textarea>
            </div>
            <div className="col-md-6">
              <label>Semester</label>
              <input type="text" name="semester" className="form-control" value={formData.semester} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label>Year</label>
              <input type="text" name="year" className="form-control" value={formData.year} onChange={handleChange} />
            </div>
          </div>
        </div>
      </div>

      {/* Section B */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">Section B: Missed Exam Details</div>
        <div className="card-body">
          {[0, 1, 2, 3].map((i) => (
            <div className="row g-3 mb-2" key={i}>
              <div className="col-md-4">
                <input type="text" className="form-control" placeholder={`Course Code ${i + 1}`} />
              </div>
              <div className="col-md-4">
                <input type="date" className="form-control" placeholder="Exam Date" />
              </div>
              <div className="col-md-4">
                <input type="time" className="form-control" placeholder="Exam Time" />
              </div>
            </div>
          ))}
          <div className="mt-2">
            <label>Campus</label>
            <input type="text" name="campus" className="form-control" value={formData.campus} onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* Section C */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">Section C: Application Details</div>
        <div className="card-body">
          <div className="form-check">
            <input type="checkbox" className="form-check-input" name="compassionate" checked={formData.applicationType.compassionate} onChange={handleChange} />
            <label className="form-check-label">Compassionate Pass</label>
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" name="aegrotat" checked={formData.applicationType.aegrotat} onChange={handleChange} />
            <label className="form-check-label">Aegrotat Pass</label>
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" name="special" checked={formData.applicationType.special} onChange={handleChange} />
            <label className="form-check-label">Special Examination</label>
          </div>
          <label className="mt-3">Reason for Application</label>
          <textarea name="reason" className="form-control" rows="3" value={formData.reason} onChange={handleChange}></textarea>

          <div className="row mt-3">
            <div className="col-md-6">
              <label>Date</label>
              <input type="date" name="appDate" className="form-control" value={formData.appDate} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label>Applicant’s Signature</label>
              <input type="text" name="appSignature" className="form-control" value={formData.appSignature} onChange={handleChange} />
            </div>
          </div>
        </div>
      </div>

      {/* Section D */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">Section D: Medical Officer</div>
        <div className="card-body">
          <div className="form-check">
            <input type="checkbox" name="unable" className="form-check-input" checked={formData.medical.unable} onChange={handleChange} />
            <label className="form-check-label">Student is unable to attend exam</label>
          </div>
          <div className="form-check">
            <input type="checkbox" name="impaired" className="form-check-input" checked={formData.medical.impaired} onChange={handleChange} />
            <label className="form-check-label">Student’s performance is likely to be impaired</label>
          </div>
          <div className="form-check">
            <input type="checkbox" name="fine" className="form-check-input" checked={formData.medical.fine} onChange={handleChange} />
            <label className="form-check-label">Student is able to attend without impairment</label>
          </div>

          <label className="mt-3">Comments</label>
          <textarea name="comments" className="form-control" rows="3" value={formData.medical.comments} onChange={handleChange}></textarea>

          <div className="row mt-3">
            <div className="col-md-6">
              <label>Medical Officer Name</label>
              <input type="text" name="medOfficerName" className="form-control" value={formData.medical.medOfficerName} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label>Signature</label>
              <input type="text" name="medOfficerSign" className="form-control" value={formData.medical.medOfficerSign} onChange={handleChange} />
            </div>
            <div className="col-md-6 mt-2">
              <label>Date</label>
              <input type="date" name="medDate" className="form-control" value={formData.medical.medDate} onChange={handleChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
