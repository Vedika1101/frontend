import React, { useState } from "react";
import axios from "axios";
import "./Add.scss";

const Add = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    coverImage: null,
    uploadImages: [],
    description: "",
    serviceTitle: "",
    shortDescription: "",
    deliveryTime: "",
    revisionNumber: "",
    features: ["", "", "", ""],
    price: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("coverImage", formData.coverImage[0]);
    for (let i = 0; i < formData.uploadImages.length; i++) {
      data.append("uploadImages", formData.uploadImages[i]);
    }
    data.append("description", formData.description);
    data.append("serviceTitle", formData.serviceTitle);
    data.append("shortDescription", formData.shortDescription);
    data.append("deliveryTime", formData.deliveryTime);
    data.append("revisionNumber", formData.revisionNumber);
    formData.features.forEach((feature, index) => {
      data.append(`feature${index + 1}`, feature);
    });
    data.append("price", formData.price);

    try {
      const response = await axios.post("http://localhost:3000/api/gigs", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form data", error);
    }
  };

  return (
    <div className="add">
      <div className="container">
        <h1 style={{ fontFamily: 'Arial, sans-serif' }}>Add New Gig</h1>
        <form onSubmit={handleSubmit} className="sections">
          <div className="info">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            <label htmlFor="category">Category</label>
            <select name="category" id="cats" onChange={handleChange}>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <label htmlFor="coverImage">Cover Image</label>
            <input type="file" name="coverImage" onChange={handleChange} />
            <label htmlFor="uploadImages">Upload Images</label>
            <input type="file" name="uploadImages" multiple onChange={handleChange} />
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
              onChange={handleChange}
            ></textarea>
            <button type="submit">Create</button>
          </div>
          <div className="details">
            <label htmlFor="serviceTitle">Service Title</label>
            <input
              type="text"
              name="serviceTitle"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />
            <label htmlFor="shortDescription">Short Description</label>
            <textarea
              name="shortDescription"
              placeholder="Short description of your service"
              cols="30"
              rows="10"
              onChange={handleChange}
            ></textarea>
            <label htmlFor="deliveryTime">Delivery Time (e.g. 3 days)</label>
            <input type="number" name="deliveryTime" onChange={handleChange} />
            <label htmlFor="revisionNumber">Revision Number</label>
            <input type="number" name="revisionNumber" onChange={handleChange} />
            <label htmlFor="features">Add Features</label>
            {formData.features.map((feature, index) => (
              <input
                key={index}
                type="text"
                placeholder={`e.g. feature ${index + 1}`}
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
              />
            ))}
            <label htmlFor="price">Price</label>
            <input type="number" name="price" onChange={handleChange} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
