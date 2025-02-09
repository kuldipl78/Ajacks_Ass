import React, { Component } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentPage: 1,
      usersPerPage: 5, // Change this to adjust the number of users per page
    };
  }

  componentDidMount() {
    fetch("http://localhost:2000/users")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onAddNewUser = () => {
    this.props.navigate("/addUser");
  };

  onEditUser = (id) => {
    this.props.navigate(`/edituser/${id}`);
  };

  onDeleteUser = (id) => {
    fetch(`http://localhost:2000/deleteuser/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        this.setState((prevState) => ({
          data: prevState.data.filter((user) => user.id !== id),
        }));
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  // Handle pagination change
  paginate = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  render() {
    const { data, currentPage, usersPerPage } = this.state;

    // Get current users
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);

    // Calculate total pages
    const totalPages = Math.ceil(data.length / usersPerPage);

    return (
      <div className="main-container">
        <h1 className="main-heading">User Management</h1>
        <button onClick={this.onAddNewUser} className="add-btn">
          ADD
        </button>

        <div className="table-container">
        <table className="main_table" >
          <thead className="info_table">
            <tr>
              <th className="id">ID</th>
              <th className="first_name">First Name</th>
              <th style={{ width: "20%" }}>Last Name</th>
              <th style={{ width: "20%" }}>Email</th>
              <th style={{ width: "20%" }}>Department</th>
              <th>CRUD Operations</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((d, i) => (
              <tr key={i}>
                <td className="id">{d.id}</td>
                <td className="first_name">{d.First_Name}</td>
                <td className="last_name">{d.Last_Name}</td>
                <td className="email">{d.Email}</td>
                <td className="department">{d.Department}</td>
                <td className="operations">
                  <div className="operation-container">
                    <button onClick={() => this.onEditUser(d.id)} className="edit-btn">
                      Edit
                    </button>
                    <button onClick={() => this.onDeleteUser(d.id)} className="delete-btn">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        </div>
       

        {/* Pagination Controls */}
        <div className="pagination-container" style={{ overflowX: 'scroll', whiteSpace: 'nowrap' }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => this.paginate(i + 1)}
              className={`pagination-btn ${currentPage === i + 1 ? "active" : ""}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

// Higher-Order Component to inject the navigate prop using the useNavigate hook
function withNavigation(ComponentToWrap) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return <ComponentToWrap {...props} navigate={navigate} />;
  };
}

export default withNavigation(Home);
