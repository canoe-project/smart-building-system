import { useRouter } from "next/router";

const Symbol = () => {
  const router = useRouter()
  return <div className={`bg-chromatic-500 w-12 h-12 rounded m-2`} onClick={()=>{router.reload()}}></div>;
};

export { Symbol };
