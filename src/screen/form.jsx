// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// function Form() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     firstName: "",
//     lastName: "",
//     title: "",
//     uspId: "",
//     dob: "",
//     telephone: "",
//     email: "",
//     address: "",
//     semester: "",
//     year: "",
//     missedExams: [{ courseCode: "", examDate: "", examTime: "" }],
//     campus: "",
//     applicationType: {
//       compassionate: false,
//       aegrotat: false,
//       special: false,
//     },
//     reason: "",
//     appDate: "",
//     appSignature: "",
//     medical: {
//       comments: "",
//       unable: false,
//       impaired: false,
//       fine: false,
//       medOfficerName: "",
//       medOfficerSign: "",
//       medDate: "",
//     },
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (name in formData.applicationType) {
//       setFormData((prev) => ({
//         ...prev,
//         applicationType: {
//           ...prev.applicationType,
//           [name]: checked,
//         },
//       }));
//     } else if (name in formData.medical) {
//       setFormData((prev) => ({
//         ...prev,
//         medical: {
//           ...prev.medical,
//           [name]: type === "checkbox" ? checked : value,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   return (
//     <div className="container my-4">
//       <h2 className="text-center mb-4">USP Special Exam / Compassionate / Aegrotat Form</h2>

//       {/* Section A */}
//       <div className="card mb-4">
//         <div className="card-header bg-primary text-white">Section A: Personal Details</div>
//         <div className="card-body">
//           <div className="row g-3">
//             <div className="col-md-6">
//               <label>Full Name</label>
//               <input type="text" name="fullName" className="form-control" value={formData.fullName} onChange={handleChange} />
//             </div>
//             <div className="col-md-6">
//               <label>Title</label>
//               <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} />
//             </div>
//             <div className="col-md-6">
//               <label>USP ID Number</label>
//               <input type="text" name="uspId" className="form-control" value={formData.uspId} onChange={handleChange} />
//             </div>
//             <div className="col-md-6">
//               <label>Date of Birth</label>
//               <input type="date" name="dob" className="form-control" value={formData.dob} onChange={handleChange} />
//             </div>
//             <div className="col-md-6">
//               <label>Telephone</label>
//               <input type="text" name="telephone" className="form-control" value={formData.telephone} onChange={handleChange} />
//             </div>
//             <div className="col-md-6">
//               <label>Email</label>
//               <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
//             </div>
//             <div className="col-12">
//               <label>Postal Address</label>
//               <textarea name="address" className="form-control" rows="2" value={formData.address} onChange={handleChange}></textarea>
//             </div>
//             <div className="col-md-6">
//               <label>Semester</label>
//               <input type="text" name="semester" className="form-control" value={formData.semester} onChange={handleChange} />
//             </div>
//             <div className="col-md-6">
//               <label>Year</label>
//               <input type="text" name="year" className="form-control" value={formData.year} onChange={handleChange} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Section B */}
//       <div className="card mb-4">
//         <div className="card-header bg-primary text-white">Section B: Missed Exam Details</div>
//         <div className="card-body">
//           {[0, 1, 2, 3].map((i) => (
//             <div className="row g-3 mb-2" key={i}>
//               <div className="col-md-4">
//                 <input type="text" className="form-control" placeholder={`Course Code ${i + 1}`} />
//               </div>
//               <div className="col-md-4">
//                 <input type="date" className="form-control" placeholder="Exam Date" />
//               </div>
//               <div className="col-md-4">
//                 <input type="time" className="form-control" placeholder="Exam Time" />
//               </div>
//             </div>
//           ))}
//           <div className="mt-2">
//             <label>Campus</label>
//             <input type="text" name="campus" className="form-control" value={formData.campus} onChange={handleChange} />
//           </div>
//         </div>
//       </div>

//       {/* Section C */}
//       <div className="card mb-4">
//         <div className="card-header bg-primary text-white">Section C: Application Details</div>
//         <div className="card-body">
//           <div className="form-check">
//             <input type="checkbox" className="form-check-input" name="compassionate" checked={formData.applicationType.compassionate} onChange={handleChange} />
//             <label className="form-check-label">Compassionate Pass</label>
//           </div>
//           <div className="form-check">
//             <input type="checkbox" className="form-check-input" name="aegrotat" checked={formData.applicationType.aegrotat} onChange={handleChange} />
//             <label className="form-check-label">Aegrotat Pass</label>
//           </div>
//           <div className="form-check">
//             <input type="checkbox" className="form-check-input" name="special" checked={formData.applicationType.special} onChange={handleChange} />
//             <label className="form-check-label">Special Examination</label>
//           </div>
//           <label className="mt-3">Reason for Application</label>
//           <textarea name="reason" className="form-control" rows="3" value={formData.reason} onChange={handleChange}></textarea>

//           <div className="row mt-3">
//             <div className="col-md-6">
//               <label>Date</label>
//               <input type="date" name="appDate" className="form-control" value={formData.appDate} onChange={handleChange} />
//             </div>
//             <div className="col-md-6">
//               <label>Applicant’s Signature</label>
//               <input type="text" name="appSignature" className="form-control" value={formData.appSignature} onChange={handleChange} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Form;

//----------------------pre------------------------//

// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// function Form() {
//   const [formType, setFormType] = useState("compassionate");

//   const [formData, setFormData] = useState({
//     fullName: "",
//     title: "",
//     Id: "",
//     dob: "",
//     telephone: "",
//     email: "",
//     address: "",
//    // semester: "",
//     year: "",
//     campus: "",
//     reason: "",
//     appDate: "",
//     appSignature: "",

//     missedExams: [{ courseCode: "", examDate: "", examTime: "" }],
//     applicationType: {
//       compassionate: false,
//       aegrotat: false,
//       special: false,
//     },
//     medical: {
//       comments: "",
//       unable: false,
//       impaired: false,
//       fine: false,
//       medOfficerName: "",
//       medOfficerSign: "",
//       medDate: "",
//     },

//     // Graduation specific
//     program: "",
//     gradSemester: "",
//     declaration: "",

//     // Re-sit specific
//     resitCourses: [{ courseCode: "", reason: "" }],
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (name in formData.applicationType) {
//       setFormData((prev) => ({
//         ...prev,
//         applicationType: {
//           ...prev.applicationType,
//           [name]: checked,
//         },
//       }));
//     } else if (name in formData.medical) {
//       setFormData((prev) => ({
//         ...prev,
//         medical: {
//           ...prev.medical,
//           [name]: type === "checkbox" ? checked : value,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: type === "checkbox" ? checked : value,
//       }));
//     }
//   };

//   return (
//     <div className="container my-4">
//       <h2 className="text-center mb-4">USP Application Form</h2>

//       <div className="mb-4">
//         <label>Select Application Type</label>
//         <select
//           className="form-select"
//           value={formType}
//           onChange={(e) => setFormType(e.target.value)}
//         >
//           <option value="graduation">Apply for Graduation</option>
//           <option value="compassionate">Compassionate / Aegrotat / Special Exam</option>
//           <option value="resit">Re-sit Exam</option>
//         </select>
//       </div>

//       {/* Section A: Personal Details */}
//       <div className="card mb-4">
//         <div className="card-header bg-primary text-white">Section A: Personal Details</div>
//         <div className="card-body">
//           <div className="row g-3"> 
//            {["fullName", "title", "Id", "dob", "telephone", "email", "year"].map((field, i) => (
//               <div className="col-md-6" key={i}>
//                 <label>{field === "dob" ? "Date of Birth" : field.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}</label>
//                 <input
//                   type={field === "dob" ? "date" : field === "email" ? "email" : "text"}
//                   name={field}
//                   className="form-control"
//                   value={formData[field]}
//                   onChange={handleChange}
//                 />
//               </div>
//             ))}
//             <div className="col-12">
//               <label>Postal Address</label>
//               <textarea
//                 name="address"
//                 className="form-control"
//                 rows="2"
//                 value={formData.address}
//                 onChange={handleChange}
//               ></textarea>
//             </div>
//           </div>
//         </div>
//       </div>

//-----------------------------pre----------------------------//

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// function Form() {
//   const [formType, setFormType] = useState("compassionate");
//   const [formData, setFormData] = useState({
//     fullName: "",
//     title: "",
//     Id: "",
//     dob: "",
//     telephone: "",
//     email: "",
//     address: "",
//     year: "",
//     campus: "",
//     reason: "",
//     appDate: "",
//     appSignature: "",
//     missedExams: [{ courseCode: "", examDate: "", examTime: "" }],
//     applicationType: {
//       compassionate: false,
//       aegrotat: false,
//       special: false,
//     },
//     medical: {
//       comments: "",
//       unable: false,
//       impaired: false,
//       fine: false,
//       medOfficerName: "",
//       medOfficerSign: "",
//       medDate: "",
//     },
    
//     program: "",
//     gradSemester: "",
//     declaration: "",
//     resitCourses: [{ courseCode: "", reason: "" }],
//   });

//   // Fetch student details on mount
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (!storedUser) return;
//     const user = JSON.parse(storedUser);

//     // Fetch student details by user ID
//     axios
//       .get(`http://localhost:4149/api/student/${user.id}`)
//       // .then((res) => {
//       //   const student = res.data;
//       .then((res) => {
//   const student = res.data;
//       // Convert dob to YYYY-MM-DD if present
//       let dob = "";
//       if (student.dob) {
//         dob = new Date(student.dob).toISOString().split("T")[0];
//       }
//         setFormData((prev) => ({
//           ...prev,
//           fullName: student.first_name && student.last_name ? `${student.first_name} ${student.last_name}` : "",
//           Id: student.id || "",
//           dob: dob || "",
//           telephone: student.phone || "",
//           email: student.email || "",
//           address: student.address || "",
//           year: student.year || "",
//           // title remains as is (editable by user)
//         }));
//       })
//       .catch((err) => {
//         // Optionally handle error
//       });


//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (name in formData.applicationType) {
//       setFormData((prev) => ({
//         ...prev,
//         applicationType: {
//           ...prev.applicationType,
//           [name]: checked,
//         },
//       }));
//     } else if (name in formData.medical) {
//       setFormData((prev) => ({
//         ...prev,
//         medical: {
//           ...prev.medical,
//           [name]: type === "checkbox" ? checked : value,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: type === "checkbox" ? checked : value,
//       }));
//     }
//   };

//   return (
//     <div className="container my-4">
//       <h2 className="text-center mb-4">USP Application Form</h2>
//       <div className="mb-4">
//         <label>Select Application Type</label>
//         <select
//           className="form-select"
//           value={formType}
//           onChange={(e) => setFormType(e.target.value)}
//         >
//           <option value="graduation">Apply for Graduation</option>
//           <option value="compassionate">Compassionate / Aegrotat / Special Exam</option>
//           <option value="resit">Re-sit Exam</option>
//         </select>
//       </div>

//       {/* Section A: Personal Details */}
//       <div className="card mb-4">
//         <div className="card-header bg-primary text-white">Section A: Personal Details</div>
//         <div className="card-body">
//           <div className="row g-3">
//             {["fullName", "title", "Id", "dob", "telephone", "email", "year"].map((field, i) => (
//               <div className="col-md-6" key={i}>
//                 <label>
//                   {field === "dob"
//                     ? "Date of Birth"
//                     : field === "Id"
//                     ? "Student ID"
//                     : field.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
//                 </label>
//                 <input
//                   type={field === "dob" ? "date" : field === "email" ? "email" : "text"}
//                   name={field}
//                   className="form-control"
//                   value={formData[field]}
//                   onChange={handleChange}
//                 />
//               </div>
//             ))}
//             <div className="col-12">
//               <label>Postal Address</label>
//               <textarea
//                 name="address"
//                 className="form-control"
//                 rows="2"
//                 value={formData.address}
//                 onChange={handleChange}
//               ></textarea>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Section B: Compassionate / Aegrotat / Special */}
//       {formType === "compassionate" && (
//         <>
//           <div className="card mb-4">
//             <div className="card-header bg-primary text-white">Section B: Missed Exam Details</div>
//             <div className="card-body">
//               {[0, 1, 2, 3].map((i) => (
//                 <div className="row g-3 mb-2" key={i}>
//                   <div className="col-md-4">
//                     <input type="text" className="form-control" placeholder={`Course Code ${i + 1}`} />
//                   </div>
//                   <div className="col-md-4">
//                     <input type="date" className="form-control" placeholder="Exam Date" />
//                   </div>
//                   <div className="col-md-4">
//                     <input type="time" className="form-control" placeholder="Exam Time" />
//                   </div>
//                 </div>
//               ))}
//               <div className="mt-2">
//                 <label>Campus</label>
//                 <input type="text" name="campus" className="form-control" value={formData.campus} onChange={handleChange} />
//               </div>
//             </div>
//           </div>


            
          

//           {/* Section C: Application Details */}
//           <div className="card mb-4">
//             <div className="card-header bg-primary text-white">Section C: Application Details</div>
//             <div className="card-body">
//               {["compassionate", "aegrotat", "special"].map((type) => (
//                 <div className="form-check" key={type}>
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     name={type}
//                     checked={formData.applicationType[type]}
//                     onChange={handleChange}
//                   />
//                   <label className="form-check-label">{type.charAt(0).toUpperCase() + type.slice(1)} Pass</label>
//                 </div>
//               ))}

//               <label className="mt-3">Reason for Application</label>
//               <textarea name="reason" className="form-control" rows="3" value={formData.reason} onChange={handleChange}></textarea>

//               {/* <div className="row mt-3">
//                 <div className="col-md-6">
//                   <label>Date</label>
//                   <input type="date" name="appDate" className="form-control" value={formData.appDate} onChange={handleChange} />
//                 </div>
//                 <div className="col-md-6">
//                   <label>Applicant’s Signature</label>
//                   <input type="text" name="appSignature" className="form-control" value={formData.appSignature} onChange={handleChange} />
//                 </div>
//               </div> */}
//             </div>
//           </div>

//           {/* Section D: Medical Officer */}


//           {/* <div className="card mb-4">
//             <div className="card-header bg-primary text-white">Section D: Medical Officer</div>
//             <div className="card-body">
//               {["unable", "impaired", "fine"].map((field) => (
//                 <div className="form-check" key={field}>
//                   <input
//                     type="checkbox"
//                     name={field}
//                     className="form-check-input"
//                     checked={formData.medical[field]}
//                     onChange={handleChange}
//                   />
//                   <label className="form-check-label">
//                     {field === "unable"
//                       ? "Student is unable to attend exam"
//                       : field === "impaired"
//                       ? "Student’s performance is likely to be impaired"
//                       : "Student is able to attend without impairment"}
//                   </label>
//                 </div>
//               ))}

//               <label className="mt-3">Comments</label>
//               <textarea name="comments" className="form-control" rows="3" value={formData.medical.comments} onChange={handleChange}></textarea>

//               <div className="row mt-3">
//                 <div className="col-md-6">
//                   <label>Medical Officer Name</label>
//                   <input type="text" name="medOfficerName" className="form-control" value={formData.medical.medOfficerName} onChange={handleChange} />
//                 </div>
//                 <div className="col-md-6">
//                   <label>Signature</label>
//                   <input type="text" name="medOfficerSign" className="form-control" value={formData.medical.medOfficerSign} onChange={handleChange} />
//                 </div>
//                 <div className="col-md-6 mt-2">
//                   <label>Date</label>
//                   <input type="date" name="medDate" className="form-control" value={formData.medical.medDate} onChange={handleChange} />
//                 </div>
//               </div>
//             </div>
//           </div> */}

//           <div className="card mb-4">
//             <div className="card-header bg-primary text-white">Section D: Medical Officer</div>
//             <div className="card-body">
//               <label>Upload Medical Certificate / Document</label>
//               <input
//                 type="file"
//                 className="form-control"
//                 accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
//                 onChange={async (e) => {
//                   const file = e.target.files[0];
//                   if (!file) return;
//                   const formDataUpload = new FormData();
//                   formDataUpload.append("document", file);

//                   try {
//                     await axios.post(
//                       "http://localhost:4149/api/upload-medical-doc",
//                       formDataUpload,
//                       {
//                         headers: { "Content-Type": "multipart/form-data" },
//                       }
//                     );
//                     alert("File uploaded successfully!");
//                   } catch (err) {
//                     alert("File upload failed.");
//                   }
//                 }}
//               />
//             </div>
//           </div>

//         </>
//       )}

//       {/* Graduation Form */}
//       {formType === "graduation" && (
//         <div className="card mb-4">
//           <div className="card-header bg-success text-white">Graduation Application</div>
//           <div className="card-body">
//             <label>Programme of Study</label>
//             <input type="text" className="form-control mb-3" name="program" value={formData.program} onChange={handleChange} />
//             <label>Expected Graduation Semester</label>
//             <input type="text" className="form-control mb-3" name="gradSemester" value={formData.gradSemester} onChange={handleChange} />
//             <label>Declaration</label>
//             <textarea className="form-control" rows="3" name="declaration" value={formData.declaration} onChange={handleChange}></textarea>
//           </div>
//         </div>
//       )}

//       {/* Re-sit Form */}
//       {formType === "resit" && (
//         <div className="card mb-4">
//           <div className="card-header bg-warning text-white">Re-sit Application</div>
//           <div className="card-body">
//             {[0, 1, 2].map((i) => (
//               <div className="row g-3 mb-2" key={i}>
//                 <div className="col-md-6">
//                   <input type="text" className="form-control" placeholder={`Course Code ${i + 1}`} />
//                 </div>
//                 <div className="col-md-6">
//                   <input type="text" className="form-control" placeholder="Reason for Re-sit" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Form;


//-------------shiv -----------------//
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Form() {
  const [formType, setFormType] = useState("compassionate");
  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    Id: "",
    dob: "",
    telephone: "",
    email: "",
    address: "",
    // year: "",
    campus: "",
    reason: "",
    appDate: "",
    appSignature: "",
    applicationType: {
      compassionate: false,
      aegrotat: false,
      special: false,
    },
    medical: {
      comments: "",
      unable: false,
      impaired: false,
      fine: false,
      medOfficerName: "",
      medOfficerSign: "",
      medDate: "",
    },
    program: "",
    gradSemester: "",
    declaration: "",
    resitCourses: [{ courseCode: "", reason: "" }],
  });

  const [studentCourses, setStudentCourses] = useState([]);
  const [missedExams, setMissedExams] = useState([
    { courseId: "", examDate: "", examTime: "" }
  ]);
  const [filePath, setFilePath] = useState("");

  // Fetch student details and courses on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;
    const user = JSON.parse(storedUser);

    // Fetch student details
    axios
      .get(`http://localhost:4149/api/student/${user.id}`)
      .then((res) => {
        const student = res.data;
        let dob = "";
        if (student.dob) {
          dob = new Date(student.dob).toISOString().split("T")[0];
        }
        setFormData((prev) => ({
          ...prev,
          fullName: student.first_name && student.last_name ? `${student.first_name} ${student.last_name}` : "",
          Id: student.id || "",
          dob: dob || "",
          telephone: student.phone || "",
          email: student.email || "",
          address: student.address || "",
          program: student.program_name || "",
         //year: student.year || "",
        }));
      })
      .catch(() => {});

  //Fetch student courses
    axios
      .get(`http://localhost:4149/api/student-courses/${user.id}`)
      .then((res) => setStudentCourses(res.data))   
      .catch(() => setStudentCourses([]));
  }, []);
  
  // Handler for missed exams
  const handleMissedExamChange = (idx, field, value) => {
    setMissedExams((prev) =>
      prev.map((row, i) =>
        i === idx ? { ...row, [field]: value } : row
      )
    );
  };

  const addMissedExamRow = () => {
    setMissedExams((prev) => [...prev, { courseId: "", examDate: "", examTime: "" }]);
  };

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
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // Graduation button handler-----//
    // const handleGraduationApplication = async () => {
    //   const storedUser = localStorage.getItem("user");
    //   if (!storedUser) {
    //     alert("User not found.");
    //     return;
    //   }
    //   const user = JSON.parse(storedUser);

    //   try {
    //     // 1. Check graduation status
    //     const res = await axios.get(
    //       `http://localhost:4149/api/graduation-status/${user.id}`
    //     );
    //     if (res.data.completion_status === "Completed All Courses") {
    //       // 2. If completed, send application to backend
    //       await axios.post("http://localhost:4149/api/submit-graduation", formData);
    //       alert("Application sent! (All courses completed)");
    //     } else {
    //       alert("You have not completed all required courses for graduation. Please check your program requirements.");
    //     }
    //   } catch (err) {
    //     alert("Could not verify graduation status or send application.");
    //   }
    // };

    const handleGraduationApplication = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        alert("User not found.");
        return;
      }
      const user = JSON.parse(storedUser);

      try {
        // 1. Check graduation status
        const res = await axios.get(
          `http://localhost:4149/api/graduation-status/${user.id}`
        );
        if (res.data.completion_status === "Completed All Courses") {
          // 2. If completed, send application to backend with current timestamp
          await axios.post("http://localhost:4149/api/submit-graduation", {
            ...formData,
            appDate: new Date().toISOString(),
          });
          alert("Application sent! (All courses completed)");
        } else {
          alert("You have not completed all required courses for graduation. Please check your program requirements.");
        }
      } catch (err) {
        alert("Could not verify graduation status or send application.");
      }
    };

    
    // Compassionate button handler -------//
    const handleCompassionateApplication = async () => {
      try {
        await axios.post("http://localhost:4149/api/submit-compassionate", {
          ...formData,
          missedExams,
          filePath,
          appDate: new Date().toISOString(),
        });
        alert("Compassionate application sent!");
      } catch (err) {
        alert("Failed to send compassionate application.");
      }
    };

    // Resit button handler ----------------//
    const handleResitApplication = async () => {
      try {
        await axios.post("http://localhost:4149/api/submit-resit", {
          ...formData,
          resitCourses,
            appDate: new Date().toISOString(),
        });
        alert("Re-sit application sent!");
      } catch (err) {
        alert("Failed to send re-sit application.");
      }
    };


    // Re-sit state and fetch grades -----------------//
    // Add this state at the top of your Form component
    const [resitCourses, setResitCourses] = useState([{ courseId: "", reason: "" }]);
    const [gradeCourses, setGradeCourses] = useState([]);

    // Fetch grades for the student (for re-sit dropdown)
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      const user = JSON.parse(storedUser);

      axios
        .get(`http://localhost:4149/api/grades/${user.id}`)
        .then((res) => setGradeCourses(res.data))
        .catch(() => setGradeCourses([]));
    }, []);
    
    // Handler for re-sit courses----------/
    const handleResitCourseChange = (idx, field, value) => {
      setResitCourses((prev) =>
        prev.map((row, i) =>
          i === idx ? { ...row, [field]: value } : row
        )
      );
    };

    const addResitCourseRow = () => {
      setResitCourses((prev) => [...prev, { courseId: "", reason: "" }]);
    };


  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">USP Application Form</h2>
      <div className="mb-4">
        <label>Select Application Type</label>
        <select
          className="form-select"
          value={formType}
          onChange={(e) => setFormType(e.target.value)}
        >
          <option value="graduation">Apply for Graduation</option>
          <option value="compassionate">Compassionate / Aegrotat / Special Exam</option>
          <option value="resit">Re-sit Exam</option>
        </select>
      </div>

      {/* Section A: Personal Details */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">Section A: Personal Details</div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                className="form-control"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label>Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label>Student ID</label>
              <input
                type="text"
                name="Id"
                className="form-control"
                value={formData.Id}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                className="form-control"
                value={formData.dob}
                readOnly
                disabled
              />
            </div>
            <div className="col-md-6">
              <label>Telephone</label>
              <input
                type="text"
                name="telephone"
                className="form-control"
                value={formData.telephone}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <label>Postal Address</label>
              <textarea
                name="address"
                className="form-control"
                rows="2"
                value={formData.address}
                onChange={handleChange}
              ></textarea>
            </div>
            {/* <div className="col-md-6">
              <label>Year</label>
              <input
                type="text"
                name="year"
                className="form-control"
                value={formData.year}
                onChange={handleChange}
              />
            </div> */}
          </div>
        </div>
      </div>

      {/* Section B: Missed Exam Details */}
      {formType === "compassionate" && (
        <>
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">Section B: Missed Exam Details</div>
            <div className="card-body">
              {missedExams.map((row, i) => (
                <div className="row g-3 mb-2" key={i}>
                  <div className="col-md-4">
                    {/* <select
                      className="form-select"
                      value={row.courseId}
                      onChange={(e) => handleMissedExamChange(i, "courseId", e.target.value)}
                    >
                      <option value="">Select Course</option>
                      {studentCourses.map((course) => (
                        <option key={course.course_id} value={course.course_id}>
                          {course.course_id} - {course.course_name}
                        </option>
                      ))}
                    </select> */}
                    <select
                      className="form-select"
                      value={row.courseId}
                      onChange={(e) => handleMissedExamChange(i, "courseId", e.target.value)}
                    >
                      <option value="">Select Course</option>
                      {studentCourses.map((course) => (
                        <option key={course.course_id} value={course.course_id}>
                          {course.course_id} - {course.course_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="date"
                      className="form-control"
                      value={row.examDate}
                      onChange={(e) => handleMissedExamChange(i, "examDate", e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="time"
                      className="form-control"
                      value={row.examTime}
                      onChange={(e) => handleMissedExamChange(i, "examTime", e.target.value)}
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-secondary mt-2"
                onClick={addMissedExamRow}
              >
                Add Another Missed Exam
              </button>
              <div className="mt-2">
                <label>Campus</label>
                <input
                  type="text"
                  name="campus"
                  className="form-control"
                  value={formData.campus}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Section C: Application Details */}
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">Section C: Application Details</div>
            <div className="card-body">
              {["compassionate", "aegrotat", "special"].map((type) => (
                <div className="form-check" key={type}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name={type}
                    checked={formData.applicationType[type]}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">{type.charAt(0).toUpperCase() + type.slice(1)} Pass</label>
                </div>
              ))}
              <label className="mt-3">Reason for Application</label>
              <textarea
                name="reason"
                className="form-control"
                rows="3"
                value={formData.reason}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          {/* Section D: Medical Officer - Upload Only */}
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">Section D: Medical Officer</div>
            <div className="card-body">
              <label>Upload Medical Certificate / Document</label>
              <input
                type="file"
                className="form-control"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const formDataUpload = new FormData();
                  formDataUpload.append("document", file);

                  try {
                    // await axios.post(
                    const res = await axios.post(
                      "http://localhost:4149/api/upload-medical-doc",
                      formDataUpload,
                      {
                        headers: { "Content-Type": "multipart/form-data" },
                      }
                    );
                    setFilePath(res.data.filePath);
                    alert("File uploaded successfully!");
                  } catch (err) {
                    alert("File upload failed.");
                  }
                }}
              />
              {/*speacial button to send application exams*/}
                {/* <button
                  type="button"
                  className="btn btn-primary mt-3"
                  onClick={() => alert("Application sent!spNot implemented)")}
                >
                  Send Application
                </button>  */}

                <button
                  type="button"
                  className="btn btn-primary mt-3"
                  onClick={handleCompassionateApplication}
                >
                  Send Application
                </button>

            </div>
          </div>
        </>
      )}

      {/* Graduation Form */}
      {formType === "graduation" && (
        <div className="card mb-4">
          <div className="card-header bg-success text-white">Graduation Application</div>
          <div className="card-body">
            {/* <label>Programme of Study</label>
            <input
              type="text"
              className="form-control mb-3"
              name="program"
              value={formData.program}
              onChange={handleChange}
            /> */}

            <label>Programme of Study</label>
            <input
              type="text"
              className="form-control mb-3"
              name="program"
              value={formData.program}
              readOnly
              disabled
            />

            <label>Expected Graduation Semester</label>
            <input
              type="text"
              className="form-control mb-3"
              name="gradSemester"
              value={formData.gradSemester}
              onChange={handleChange}
            />
            {/* <label>Declaration</label>
            <textarea
              className="form-control"
              rows="3"
              name="declaration"
              value={formData.declaration}
              onChange={handleChange}
            ></textarea>    */}
            <button
              type="button"
              className="btn btn-primary mt-3"
               onClick={handleGraduationApplication}
            >
              Send Application
            </button>
          </div>
        </div>
      )}

      {/* Re-sit Form */}
      {/* {formType === "resit" && (
        <div className="card mb-4">
          <div className="card-header bg-warning text-white">Re-sit Application</div>
          <div className="card-body">
            {[0, 1, 2].map((i) => (
              <div className="row g-3 mb-2" key={i}>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Course Code ${i + 1}`}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Reason for Re-sit"
                  />
                </div>
              </div>
            ))}

            <button
                  type="button"
                  className="btn btn-primary mt-3"
                  onClick={() => alert("Application sent! (resit emented)")}
                >
                  Send Application
                </button> 

          </div>
        </div>
      )} */}


      {formType === "resit" && (
        <div className="card mb-4">
          <div className="card-header bg-warning text-white">Re-sit Application</div>
          <div className="card-body">
            {resitCourses.map((row, i) => (
              <div className="row g-3 mb-2" key={i}>
                <div className="col-md-6">
                  <select
                    className="form-select"
                    value={row.courseId}
                    onChange={(e) => handleResitCourseChange(i, "courseId", e.target.value)}
                  >
                    <option value="">Select Course</option>
                    {gradeCourses.map((course) => (
                      <option key={course.course_id || course.id} value={course.course_id || course.id}>
                        {course.course_code} - {course.course_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Reason for Re-sit"
                    value={row.reason}
                    onChange={(e) => handleResitCourseChange(i, "reason", e.target.value)}
                  />
                </div>
              </div>
            ))}
            {/* <button
              type="button"
              className="btn btn-secondary mt-2"
              onClick={addResitCourseRow}
            >
              Add Another Re-sit Course
            </button>
            <button
              type="button"
              className="btn btn-primary mt-3"
              onClick={() => alert("Application sent! (resit not implemented)")}
            >
              Send Application
            </button> */}
            <div className="d-grid gap-2 mt-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={addResitCourseRow}
              >
                Add Another Re-sit Course
              </button>
              {/* <button
                type="button"
                className="btn btn-primary"
                onClick={() => alert("Application sent! (resit not implemented)")}
              >
                Send Application
              </button> */}

              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={handleResitApplication}
              >
                 Send Application
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;