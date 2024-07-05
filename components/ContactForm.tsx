import React from 'react'

function ContactForm() {
    return (
        <form>
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                />
            </div>
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    rows={4}
                    required
                ></textarea>
            </div>
            <div className="mt-6">
                <button
                    type="submit"
                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit
                </button>
            </div>
        </form>
    )
}

export default ContactForm