import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../components/student/Loading';

const MyCourses = () => {

  const { backendUrl, isEducator, currency, getToken } = useContext(AppContext)

  const [courses, setCourses] = useState(null)
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const fetchEducatorCourses = async () => {

    try {

      const token = await getToken()

      const { data } = await axios.get(backendUrl + '/api/educator/courses', { headers: { Authorization: `Bearer ${token}` } })

      data.success && setCourses(data.courses)

    } catch (error) {
      toast.error(error.message)
    }

  }

  useEffect(() => {
    if (isEducator) {
      fetchEducatorCourses()
    }
  }, [isEducator])

  return courses ? (
    <div className="h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className='w-full'>
        <h2 className="pb-4 text-lg font-medium">My Courses</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">All Courses</th>
                <th className="px-4 py-3 font-semibold truncate">Earnings</th>
                <th className="px-4 py-3 font-semibold truncate">Students</th>
                <th className="px-4 py-3 font-semibold truncate">Published On</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {courses.map((course) => (
                <tr key={course._id} className="border-b border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <img src={course.courseThumbnail} alt="Course Image" className="w-16" />
                    <span className="truncate hidden md:block">{course.courseTitle}</span>
                  </td>
                  <td className="px-4 py-3">{currency} {Math.floor(course.enrolledStudents.length * (course.coursePrice - course.discount * course.coursePrice / 100))}</td>
                  <td className="px-4 py-3">{course.enrolledStudents.length}</td>
                  <td className="px-4 py-3">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3"> {/* ✅ Thêm cột mới chứa nút xoá */}
    <button
      className="text-red-500 hover:underline"
      onClick={() => {
        setSelectedCourseId(course._id);
        setShowConfirm(true);
      }}
    >
      🗑️ Xóa
    </button>
  </td>
                </tr>
              ))}
               </tbody>
          </table>
          {showConfirm && (
  <DeleteCoursePopup
    courseId={selectedCourseId}
    onClose={() => setShowConfirm(false)}
    onDeleted={fetchEducatorCourses}
  />
)}
        </div>
      </div>
    </div>
  ) : <Loading />
};



const DeleteCoursePopup = ({ courseId, onClose, onDeleted }) => {
  const { getToken, backendUrl } = useContext(AppContext);
  const handleDelete = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.delete(`${backendUrl}/api/educator/delete-course/${courseId}`, { headers: { Authorization: `Bearer ${token}` } });

      if (data.success) {
        toast.success('Đã xóa khóa học');
        onDeleted();
      } else {
        toast.error('Xóa thất bại: ' + data.message);
      }
    } catch (error) {
      toast.error('Lỗi khi xóa khóa học');
      console.error(error.response.data); 
    }
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      zIndex: 9999,
    }}>
      <div style={{ background: 'white', padding: 20, borderRadius: 10, minWidth: 300 }}>
        <p>Bạn có chắc chắn muốn xóa khóa học này?</p>
        <button onClick={handleDelete} style={{ marginRight: 10 }}>✅ Đồng ý</button>
        <button onClick={onClose}>❌ Hủy</button>
      </div>
    </div>
  );
};
export default MyCourses;