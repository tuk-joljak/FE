import { ProjectDTO } from "@/types/resume";

interface ProjectFormProps {
  projects: ProjectDTO[];
  onProjectChange: (index: number, field: keyof ProjectDTO, value: string) => void;
  onAddProject: () => void;
  onRemoveProject: (index: number) => void;
}

const ProjectForm = ({ projects, onProjectChange, onAddProject, onRemoveProject }: ProjectFormProps) => {
  return (
    <div className="p-6 border border-gray-200 rounded-lg">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">프로젝트 정보</h2>
        <button
          type="button"
          onClick={onAddProject}
          className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          + 프로젝트 추가
        </button>
      </div>

      {projects.map((project, index) => (
        <div
          key={index}
          className="p-4 mb-4 border border-gray-200 rounded"
        >
          <div className="flex justify-between mb-2">
            <h3 className="font-medium">프로젝트 #{index + 1}</h3>
            {projects.length > 1 && (
              <button
                type="button"
                onClick={() => onRemoveProject(index)}
                className="px-2 text-sm text-red-500"
              >
                삭제
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <label className="block mb-1 text-sm text-gray-700">
                프로젝트명
              </label>
              <input
                type="text"
                value={project.projectName}
                onChange={(e) =>
                  onProjectChange(
                    index,
                    "projectName",
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-700">
                소속 조직
              </label>
              <input
                type="text"
                value={project.organization}
                onChange={(e) =>
                  onProjectChange(
                    index,
                    "organization",
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-700">
                시작일 (YYYY-MM-DD)
              </label>
              <input
                type="date"
                value={project.startDate}
                onChange={(e) =>
                  onProjectChange(
                    index,
                    "startDate",
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-700">
                종료일 (YYYY-MM-DD)
              </label>
              <input
                type="date"
                value={project.endDate}
                onChange={(e) =>
                  onProjectChange(
                    index,
                    "endDate",
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="mt-3">
            <label className="block mb-1 text-sm text-gray-700">
              프로젝트 설명
            </label>
            <textarea
              value={project.description}
              onChange={(e) =>
                onProjectChange(
                  index,
                  "description",
                  e.target.value
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={2}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectForm; 