import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AdminHeader from "./layouts/AdminHeader";
import AdminSideBar from "./layouts/AdminSideBar";
import AdminFooter from "./layouts/AdminFooter";
import { db } from "../firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

export default function UpdateCategory() {
  const navigate = useNavigate();
  const categoryCollectionRef = collection(db, "medicine_categories");
  const [category, setCategory] = useState(JSON.parse(localStorage.getItem("category_obj")));

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const handleUpdateCategory = async () => {
    if (category.name) {
      const categoryDoc = doc(categoryCollectionRef, category.id);
      await updateDoc(categoryDoc, category);
      setErrorMsg("");
      setSuccessMsg("Category updated successfully!");
      setTimeout(() => {
        setSuccessMsg("");
        navigate("/categories");
      }, 1000);
    } else {
      setErrorMsg("Category name cannot be Empty!");
    }
  };
  return (
    <>
      <AdminHeader />
      <AdminSideBar />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <h4 className="page-title">Change Category</h4>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">
                      Edit Category Details
                      <Link to="/categories" className="btn btn-danger btn-sm float-right">
                        Go BACK
                      </Link>{" "}
                    </div>
                  </div>
                  <div className="card-body px-4">
                    <div className="form-group">
                      <label htmlFor="username">Category Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={category.name}
                        onChange={(event) =>
                          setCategory((prev) => ({ ...prev, name: event.target.value }))
                        }
                        placeholder="Enter Category Name"
                      />
                    </div>
                  </div>
                  <div className="form-group px-4 mb-3">
                    <div className="text-center text-danger">{errorMsg}</div>
                    <div className="text-center text-success">{successMsg}</div>
                    <button className="btn btn-success mx-3" onClick={handleUpdateCategory}>
                      Update Category
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
