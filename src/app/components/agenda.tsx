import React from "react";

import { useSession } from "next-auth/react";

export const Agenda: React.FC = () => {
  const { data: session } = useSession();

  return (
    <>
      <div>
        <div>Agenda</div>
        <div>{session?.user?.email}</div>
      </div>
    </>
  );
};
