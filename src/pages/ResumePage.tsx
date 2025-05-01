import { useResumeForm } from "@/hooks/useResumeForm";
import ResumeAnalysisResult from "@/components/Resume/ResumeAnalysisResult";
import FileUpload from "@/components/Resume/FileUpload";
import InputMethodToggle from "@/components/Resume/InputMethodToggle";
import BasicInfoForm from "@/components/Resume/BasicInfoForm";
import CareerForm from "@/components/Resume/CareerForm";
import ProjectForm from "@/components/Resume/ProjectForm";
import SubmitButton from "@/components/Resume/SubmitButton";
import LoadingSpinner from "@/components/Resume/LoadingSpinner";
import ErrorMessage from "@/components/Resume/ErrorMessage";

const ResumePage = () => {
  const {
    inputMethod,
    setInputMethod,
    file,
    isLoading,
    error,
    analysis,
    formData,
    handleFileChange,
    handleSubmit,
    handleFormChange,
    handleArrayChange,
    handleCareerChange,
    handleProjectChange,
    addCareer,
    addProject,
    removeCareer,
    removeProject,
  } = useResumeForm();

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-4xl px-4 mx-auto">
        <div className="p-8 mb-6 bg-white rounded-lg shadow-md">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">이력서 분석</h1>

          <InputMethodToggle 
            inputMethod={inputMethod} 
            onInputMethodChange={setInputMethod} 
          />

          <form onSubmit={handleSubmit} className="space-y-6">
            {inputMethod === "file" ? (
              <FileUpload file={file} onFileChange={handleFileChange} />
            ) : (
              <div className="space-y-6">
                <BasicInfoForm 
                  formData={formData} 
                  onFormChange={handleFormChange} 
                  onArrayChange={handleArrayChange} 
                />
                
                <CareerForm 
                  careers={formData.careerDTOS} 
                  onCareerChange={handleCareerChange} 
                  onAddCareer={addCareer} 
                  onRemoveCareer={removeCareer} 
                />
                
                <ProjectForm 
                  projects={formData.projectDTOS} 
                  onProjectChange={handleProjectChange} 
                  onAddProject={addProject} 
                  onRemoveProject={removeProject} 
                />
              </div>
            )}

            {error && <ErrorMessage message={error} />}

            <SubmitButton 
              isLoading={isLoading} 
              isDisabled={isLoading || (inputMethod === "file" && !file)} 
            />
          </form>
        </div>

        {isLoading && <LoadingSpinner />}

        {error && <ErrorMessage message={error} />}

        {analysis && <ResumeAnalysisResult analysis={analysis} />}
      </div>
    </div>
  );
};

export default ResumePage;
