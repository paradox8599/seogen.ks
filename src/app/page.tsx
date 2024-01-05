import { keystoneContext } from "@/lib/keystone";

export default async function Home() {
  const data = await keystoneContext.query.User.count();
  return (
    <>
      <p>{JSON.stringify(data)}</p>
    </>
  );
}
