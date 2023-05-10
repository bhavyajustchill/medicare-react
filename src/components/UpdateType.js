import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AdminHeader from "./layouts/AdminHeader";
import AdminSideBar from "./layouts/AdminSideBar";
import AdminFooter from "./layouts/AdminFooter";
import { db } from "../firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

export default function UpdateType() {
  const navigate = useNavigate();
  const medTypesCollectionRef = collection(db, "medicine_types");
  const [medType, setMedType] = useState(JSON.parse(localStorage.getItem("medtype_obj")));

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const handleUpdateMedType = async () => {
    if (medType.name) {
      const categoryDoc = doc(medTypesCollectionRef, medType.id);
      await updateDoc(categoryDoc, medType);
      setErrorMsg("");
      setSuccessMsg("Medicine Type updated Successfully!");
      setTimeout(() => {
        setSuccessMsg("");
        navigate("/types");
      }, 1000);
    } else {
      setErrorMsg("Medicine Type name cannot be Empty!");
    }
  };
  return (
    <>
      <AdminHeader />
      <AdminSideBar />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <h4 className="page-title">Change Medicine Type</h4>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">
                      Edit Type Details
                      <Link to="/types" className="btn btn-danger btn-sm float-right">
                        Go BACK
                      </Link>{" "}
                    </div>
                  </div>
                  <div className="card-body px-4">
                    <div className="form-group">
                      <label htmlFor="username">Type Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={medType.name}
                        onChange={(event) =>
                          setMedType((prev) => ({ ...prev, name: event.target.value }))
                        }
                        placeholder="Enter Type Name"
                      />
                    </div>
                  </div>
                  <div className="form-group px-4 mb-3">
                    <div className="text-center text-danger">{errorMsg}</div>
                    <div className="text-center text-success">{successMsg}</div>
                    <button className="btn btn-success mx-3" onClick={handleUpdateMedType}>
                      Update Medicine Type
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AdminFooter />
      </div>
    </>
  );
}
