import React from "react";

export const DashboardCardSkeleton = () => {
    return (
        <div className="*:animate-pulse flex items-center p-12 justify-between border-[.1em] rounded-2xl shadow-md">
            <div>
                <div className="h-6 w-32 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </div>
            <div className="hidden md:grid bg-gray-300 items-center rounded-full w-[4em] aspect-square"></div>
        </div>
    );
};

export const TableSkeleton = () => {
    return (
        <div className="animate-pulse">
            {/* Table Header */}
            <div className="flex items-center justify-between p-4">
                <div className="h-6 w-24 bg-gray-300 rounded"></div>
                <div className="h-6 w-24 bg-gray-300 rounded"></div>
                <div className="h-6 w-24 bg-gray-300 rounded"></div>
            </div>

            {/* Table Rows */}
            {[...Array(5)].map((_, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-b">
                    <div className="h-6 w-24 bg-gray-200 rounded"></div>
                    <div className="h-6 w-24 bg-gray-200 rounded"></div>
                    <div className="h-6 w-24 bg-gray-200 rounded"></div>
                </div>
            ))}
        </div>
    );
};

