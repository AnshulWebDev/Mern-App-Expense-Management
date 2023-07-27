import React from 'react'
const DataTable = ({data}) => {
  return (
    <div className="mx-auto max-w-screen-xl mt-7 shadow-md relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Refrence
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id} className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-normal whitespace-nowrap"
              >
                {item.date}
              </th>
              <td className="px-6 py-4">{item.amount}</td>
              <td className="px-6 py-4">{item.type}</td>
              <td className="px-6 py-4">{item.category}</td>
              <td className="px-6 py-4">{item.refrence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable