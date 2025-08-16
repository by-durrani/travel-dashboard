import { cn } from "lib/utils";
import React, { type FC } from "react";
import { Link, NavLink, useLoaderData, useNavigate } from "react-router";
import { logoutUser } from "~/appwrite/auth";
import { sidebarItems } from "~/constants";

type NavItemsProps = {
  handleClick?: () => void;
};

const NavItems: FC<NavItemsProps> = ({ handleClick }) => {
  const user = useLoaderData(); // fetches from the nearest or parent exported data from clientLoader function (React Router) basically just parent not in the children pages

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/sign-in");
  };

  return (
    <section className="nav-items">
      <Link to={"/"} className="link-logo">
        <img
          src="/assets/icons/logo.svg"
          alt="logo"
          decoding="async"
          loading="lazy"
        />
        <h1>Tourvisto</h1>
      </Link>
      <div className="container">
        <nav>
          {sidebarItems.map(({ id, href, icon, label }) => (
            <NavLink to={href} key={id}>
              {({ isActive }: { isActive: boolean }) => (
                <div
                  className={cn("group nav-item", {
                    "bg-primary-100 !text-white": isActive,
                  })}
                  onClick={handleClick}
                >
                  <img
                    src={icon}
                    alt={label}
                    className={cn(
                      "group-hover:brightness-0 size-4 group-hover:invert ",
                      isActive ? "brightness-0 invert" : "text-dark-200"
                    )}
                  />
                  {label}
                </div>
              )}
            </NavLink>
          ))}
        </nav>
        <footer className="nav-footer">
          <img
            src={user.imageUrl || "/assets/images/david.webp"}
            alt={user.name}
            referrerPolicy="no-referrer"
          />
          <article>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </article>
          <button className="cursor-pointer " onClick={handleLogout}>
            <img
              src="/assets/icons/logout.svg"
              alt="logout"
              className="size-6 "
            />
          </button>
        </footer>
      </div>
    </section>
  );
};

export default NavItems;
