import CourseManagement from "@/components/course-management"

export default function CoursePage({ params }: { params: { id: string } }) {
  // In a real app, you would determine user type from authentication
  const userType = "student" // This would come from your auth system

  return <CourseManagement courseId={params.id} userType={userType} />
}
