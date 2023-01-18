import { useToast } from "@chakra-ui/react";
import nookies from "nookies";

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  console.log(cookies);

  return {
    props: {}
  };
}

export default function Dashboard() {
  const toast = useToast();

  toast({
    title: "Account created.",
    description: "We've created your account for you.",
    status: "success",
    duration: 9000,
    isClosable: true
  });

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="text-center">
          <p>Dashboard</p>
          <p className="bg-red-500 rounded-md text-white mt-2 hover:cursor-pointer shadow-lg">
            Logout
          </p>
        </div>
      </div>
    </>
  );
}
