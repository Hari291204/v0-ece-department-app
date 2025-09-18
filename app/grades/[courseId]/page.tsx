import GradeManagement from "@/components/grade-management"

export default function GradesPage({ params }: { params: { courseId: string } }) {
  // In a real app, you would determine user type from authentication
  const userType = "teacher" // This would come from your auth system

  return <GradeManagement courseId={params.courseId} userType={userType} />
}
