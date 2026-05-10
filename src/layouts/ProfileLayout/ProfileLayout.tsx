import { NavLink, Outlet } from "react-router-dom";

function ProfileLayout() {
    return (
        <div className="row">
            <div className="col-3">
                <ul className="list-group">
                    <li className="list-group-item"><NavLink to="" end 
                    className={({ isActive }) => `btn btn-outline-primary ${isActive ? "active" : ""}`}>Account</NavLink></li>
                    <li className="list-group-item"><NavLink to="orders"
                    className={({ isActive }) =>`btn btn-outline-primary ${isActive ? "active" : ""}`}>Orders</NavLink></li>
                </ul>
            </div>

            <div className="col-9">
                <Outlet />
            </div>
        </div>
    )
}

export default ProfileLayout;