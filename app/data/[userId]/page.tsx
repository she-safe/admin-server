"use client"
import React, { useEffect, useState } from "react";
// react-leaflet components are rendered in a client component (see MapClient.tsx)
import MapWrapper from "./MapWrapper";
import BackButton from "@/components/back";
import { useRouter } from "next/navigation"

type UserData = {
    userId: string;
    username: string;
    location: [{
        latitude: number;
        longitude: number;
        timestamp: Date;
    }];
    score: number;
    updatedAt: string;
    createdAt: string;
};

export default function Page({ params }: { params: Promise<{ userId: string }> }) {
    const { userId } = React.use(params);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const res = await fetch("/api/data", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId }),
                });
                const data = await res.json();
                if (data.message == "Invalid Admin") router.replace("/login");
                if (!res.ok) {
                    setError(data.message || "Failed to load user data");
                    // if(data.message=="Invalid Admin")router.replace("/login");
                    return;
                }
                setUserData(data);
            } catch (e: any) {
                setError(e.message || "Network error");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [userId]);

    // compute map information once we have data
    const zoom = 10; // default
    const timestamp = new Date().toISOString();

    // const position: [number, number] = userData
    // ? [userData.location.latitude, userData.location.longitude]
    // : [0, 0];

    const location = userData?.location

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-white">Loading...</p>
            </div>
        );
    }

    if (error || !userData) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <>
            <BackButton route="/" />
            <div className="flex justify-center">
                <div className=" bg-neutral-800 w-9/10 border rounded-3xl">
                    <h1 className="mt-6 text-white text-3xl font-bold ml-5">
                        {userData?.username}
                    </h1>
                    <div className="my-6 justify-center flex items-center">
                        <div className="w-1/3 mr-7">
                            <MapWrapper location={location} zoom={zoom} />
                        </div>
                        <div className="bg-gray-900 w-1/3 h-120 text-neutral-300 rounded-2xl p-6 flex flex-col justify-between overflow-scroll">
                            <div className="flex flex-col gap-4">
                                <div className="border border-neutral-700 rounded-lg p-2">
                                    <p className="text-lg font-semibold">
                                        Score: <span className="font-normal text-blue-400">{userData?.score}</span>
                                    </p>
                                </div>
                                {location?.map((u, idx) => {
                                    return (

                                        <LocationDisplay location={[location[idx].latitude, location[idx].longitude]} />
                                    )
                                })}
                            </div>
                            <div className="flex flex-col gap-2 text-sm text-neutral-400">
                                <div className="border border-neutral-700 rounded-lg p-2">
                                    <p>Created: <span className="text-blue-400">{userData?.createdAt}</span></p>
                                </div>
                                <div className="border border-neutral-700 rounded-lg p-2">
                                    <p>Updated: <span className="text-blue-400">{userData?.updatedAt}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export function LocationDisplay(props: { location: [number, number] }) {
    return (
        <div className="border border-neutral-700 rounded-lg p-2">
            <p className="text-lg font-semibold">
                Location: <span className="font-normal text-blue-400">{props.location[0]}, {props.location[1]}</span>
            </p>
        </div>
    )
}