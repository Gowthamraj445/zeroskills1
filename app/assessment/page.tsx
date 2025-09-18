"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowRight, FileText, Brain, Target, Code, CheckCircle, GraduationCap } from "lucide-react"
import Link from "next/link"
import { DigiLockerUpload } from "@/components/digilocker-upload"
import { AptitudeTest } from "@/components/aptitude-test"
import { PersonalityAssessment } from "@/components/personality-assessment"
import { SkillsTest } from "@/components/skills-test"

const assessmentSteps = [
  {
    id: "grade-selection",
    title: "Grade Level",
    description: "Select your current grade level",
    icon: GraduationCap,
    component: null,
  },
  {
    id: "digilocker",
    title: "Academic Records",
    description: "Upload your DigiLocker documents",
    icon: FileText,
    component: DigiLockerUpload,
  },
  {
    id: "aptitude",
    title: "Aptitude Test",
    description: "Assess your logical and analytical abilities",
    icon: Brain,
    component: AptitudeTest,
  },
  {
    id: "personality",
    title: "Personality Assessment",
    description: "Discover your interests and work preferences",
    icon: Target,
    component: PersonalityAssessment,
  },
  {
    id: "skills",
    title: "Skills Evaluation",
    description: "Test your technical and practical skills",
    icon: Code,
    component: SkillsTest,
  },
]

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [selectedGrade, setSelectedGrade] = useState<string>("")

  const progress = ((currentStep + 1) / assessmentSteps.length) * 100

  const handleStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
    }
    if (currentStep < assessmentSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleGradeSelection = (grade: string) => {
    setSelectedGrade(grade)
    handleStepComplete("grade-selection")
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleNext = () => {
    if (currentStep < assessmentSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const CurrentComponent = assessmentSteps[currentStep].component
  const CurrentIcon = assessmentSteps[currentStep].icon

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
            <div className="h-4 w-px bg-border" />
            <h1 className="text-lg font-semibold">Career Assessment</h1>
          </div>
          <Badge variant="outline">
            Step {currentStep + 1} of {assessmentSteps.length}
          </Badge>
        </div>
      </header>

      <div className="container py-8">
        <div className="mx-auto max-w-4xl">
          {/* Progress Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Complete Your Assessment</h2>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Steps Overview */}
          <div className="grid gap-4 md:grid-cols-5 mb-8">
            {assessmentSteps.map((step, index) => {
              const Icon = step.icon
              const isCompleted = completedSteps.includes(step.id)
              const isCurrent = index === currentStep
              const isAccessible = index <= currentStep

              return (
                <Card
                  key={step.id}
                  className={`relative cursor-pointer transition-all ${
                    isCurrent
                      ? "border-primary bg-primary/5"
                      : isCompleted
                        ? "border-green-500 bg-green-50"
                        : isAccessible
                          ? "hover:border-primary/50"
                          : "opacity-50"
                  }`}
                  onClick={() => isAccessible && setCurrentStep(index)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                          isCompleted
                            ? "bg-green-500 text-white"
                            : isCurrent
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {isCompleted ? <CheckCircle className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                      </div>
                      <Badge
                        variant={isCurrent ? "default" : isCompleted ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {index + 1}
                      </Badge>
                    </div>
                    <CardTitle className="text-sm">{step.title}</CardTitle>
                    <CardDescription className="text-xs">{step.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>

          {/* Current Step Content */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <CurrentIcon className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-xl">{assessmentSteps[currentStep].title}</CardTitle>
                  <CardDescription>{assessmentSteps[currentStep].description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {currentStep === 0 ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">What grade are you currently in?</h3>
                    <p className="text-muted-foreground mb-6">
                      This helps us provide age-appropriate career recommendations and assessment questions.
                    </p>
                  </div>
                  <div className="max-w-md mx-auto">
                    <Select value={selectedGrade} onValueChange={handleGradeSelection}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your current grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10th">10th Grade</SelectItem>
                        <SelectItem value="12th">12th Grade</SelectItem>
                        <SelectItem value="undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="postgraduate">Postgraduate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {selectedGrade && (
                    <div className="text-center mt-4">
                      <Badge variant="secondary" className="bg-green-50 text-green-700">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Grade level selected: {selectedGrade}
                      </Badge>
                    </div>
                  )}
                </div>
              ) : CurrentComponent ? (
                <CurrentComponent onComplete={() => handleStepComplete(assessmentSteps[currentStep].id)} />
              ) : null}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center space-x-2">
              {currentStep === assessmentSteps.length - 1 && completedSteps.length === assessmentSteps.length ? (
                <Link href="/recommendations">
                  <Button size="lg">
                    View Recommendations
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={
                    currentStep === assessmentSteps.length - 1 ||
                    !completedSteps.includes(assessmentSteps[currentStep].id)
                  }
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
