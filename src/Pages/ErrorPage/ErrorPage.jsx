import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">
          ERROR 404 OOPS! PAGE NOT FOUND</h1>
      <Link to="/dashboard/CostExplorer">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          GO BACK TO HOME
        </button>
      </Link>
    </div>
  )
}

export default ErrorPage
