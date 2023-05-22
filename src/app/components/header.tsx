"use client";
import React from "react";

import { signOut, useSession } from "next-auth/react";
import { Avatar, Menu, MenuItem } from "@mui/material";

import Style from "./header.module.scss";

export function HeaderUser() {
  const { data: session } = useSession({
    required: true,
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <section className={Style.main}>
        <div className={Style.email}>{session?.user?.email}</div>

        <button onClick={handleClick}>
          <Avatar alt="Avatar" className={Style.avatar} />
        </button>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {/* <MenuItem onClick={handleClose}>Perfil</MenuItem> */}
          <MenuItem onClick={() => signOut()}>Logout</MenuItem>
        </Menu>
      </section>
    </>
  );
}
