import { getServerSession } from "next-auth";
import { authOptions } from "./auth";


export default async function getSession() {
    const session = await getServerSession(authOptions)
    return session
}