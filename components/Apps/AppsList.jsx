import React from 'react'
import { FaTrash } from 'react-icons/fa';

export const AppsList = ({ apps, onDelete,onClickOnApp }) => {

	return <div className="space-y-4">
      {apps.map(app => (
        <div key={app.id} className="flex items-center justify-between p-4 bg-white rounded shadow-md">
          <div className="flex items-center space-x-4">
            <img src={app.img} alt={app.name} className={`${!app.img && 'hidden'} w-16 h-16 object-cover rounded`} />
            <div>
              <h2 onClick={() => onClickOnApp(app)} className="text-lg font-semibold cursor-pointer">{app.name}</h2>
              <p className="text-sm text-gray-500">{app.description}</p>
            </div>
          </div>
          <button
            onClick={() => onDelete(app)}
            className="text-red-500 hover:text-red-700 p-2"
          >
            <FaTrash size={20} />
          </button>
        </div>
      ))}
	</div>

}
