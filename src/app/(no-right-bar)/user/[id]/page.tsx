import EditUser from "@/components/forms/EditUser";
import { db } from "@/lib/primsadb";
import { User } from "@prisma/client";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const user = await db.user.findUnique({
    where: {
      id: id,
    },
  });
  return (
    <div>
      <h1 className="h1-bold mb-10">Edit Profile</h1>
      <EditUser user={user as User} />
    </div>
  );
};

export default page;
