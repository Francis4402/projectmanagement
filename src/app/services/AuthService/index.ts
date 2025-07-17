"use server"

import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";


export const loginUser = async (userData: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/login`, {
            
            method: "POST",
            
            headers: {
                "Content-Type": "application/json"
            },
            
            body: JSON.stringify(userData),
            cache: "no-store",
        });

        const result = await res.json();

        
        if (result.success) {
            (await cookies()).set("token", result.token);
        }

        return result;

    } catch (error) {
        console.log(error);
    }
}


export const registerUser = async (userData: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            
            body: JSON.stringify(userData),
            cache: "no-store",
        });

        const result = await res.json();

        if (result.success) {
            (await cookies()).set("token", result.token);
        }

        return result;

    } catch (error) {
        console.log(error);
    }
}


export const getCurrentUser = async () => {
    const token = (await cookies()).get("token")?.value;

    let decodedData = null;

    if (token) {
        decodedData = await jwtDecode(token);
        return decodedData;
    } else {
        return null;
    }
}


export const logout = async () => {
    (await cookies()).delete("token");
}