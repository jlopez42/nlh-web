import { Project, ProjectFile, Question } from '../types';
import { mockProjects, mockProjectFiles, mockQuestions } from '../data/mockData';
import { getAllProjects } from '../api/projectApi';

export const projectService = {
  // Get all projects
  getProjects: async (): Promise<Project[]> => {
    return new Promise((resolve) => {
      console.log(getAllProjects());
      console.log('mock ========= ');
      console.log(mockProjects);
      setTimeout(() => resolve([...mockProjects]), 500);
    });
  },

  // Get projects by user ID
  getProjectsByUserId: async (userId: string): Promise<Project[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userProjects = mockProjects.filter(p => p.userId === userId);
        resolve(userProjects);
      }, 500);
    });
  },

  // Get project by ID
  getProjectById: async (id: string): Promise<Project | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const project = mockProjects.find(p => p.id === id);
        resolve(project || null);
      }, 300);
    });
  },

  // Create new project
  createProject: async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProject: Project = {
          ...projectData,
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date()
        };
        mockProjects.push(newProject);
        resolve(newProject);
      }, 800);
    });
  },

  // Update project
  updateProject: async (id: string, updates: Partial<Project>): Promise<Project | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockProjects.findIndex(p => p.id === id);
        if (index !== -1) {
          mockProjects[index] = { ...mockProjects[index], ...updates, updatedAt: new Date() };
          resolve(mockProjects[index]);
        } else {
          resolve(null);
        }
      }, 600);
    });
  },

  // Delete project
  deleteProject: async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockProjects.findIndex(p => p.id === id);
        if (index !== -1) {
          mockProjects.splice(index, 1);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 400);
    });
  },

  // Get project files
  getProjectFiles: async (projectId: string): Promise<ProjectFile[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const files = mockProjectFiles.filter(f => f.projectId === projectId);
        resolve(files);
      }, 300);
    });
  },

  // Upload file
  uploadFile: async (projectId: string, file: File, uploadedBy: string): Promise<ProjectFile> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newFile: ProjectFile = {
          id: Date.now().toString(),
          projectId,
          filename: file.name,
          originalName: file.name,
          size: file.size,
          type: file.type,
          uploadDate: new Date(),
          uploadedBy
        };
        mockProjectFiles.push(newFile);
        resolve(newFile);
      }, 1000);
    });
  },

  // Associate file with project (for new projects)
  associateFileWithProject: async (projectId: string, fileData: ProjectFile): Promise<ProjectFile> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedFile = { ...fileData, projectId };
        const existingIndex = mockProjectFiles.findIndex(f => f.id === fileData.id);
        
        if (existingIndex !== -1) {
          mockProjectFiles[existingIndex] = updatedFile;
        } else {
          mockProjectFiles.push(updatedFile);
        }
        
        resolve(updatedFile);
      }, 300);
    });
  },

  // Delete file
  deleteFile: async (fileId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockProjectFiles.findIndex(f => f.id === fileId);
        if (index !== -1) {
          mockProjectFiles.splice(index, 1);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 300);
    });
  },

  // Get project questions
  getProjectQuestions: async (projectId: string): Promise<Question[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const questions = mockQuestions.filter(q => q.projectId === projectId);
        resolve(questions);
      }, 400);
    });
  },

  // Add question
  addQuestion: async (questionData: Omit<Question, 'id' | 'askedAt'>): Promise<Question> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newQuestion: Question = {
          ...questionData,
          id: Date.now().toString(),
          askedAt: new Date()
        };
        mockQuestions.push(newQuestion);
        resolve(newQuestion);
      }, 500);
    });
  },

  // Respond to question
  respondToQuestion: async (questionId: string, response: string, respondedBy: string): Promise<Question | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockQuestions.findIndex(q => q.id === questionId);
        if (index !== -1) {
          mockQuestions[index] = {
            ...mockQuestions[index],
            response,
            respondedBy,
            respondedAt: new Date()
          };
          resolve(mockQuestions[index]);
        } else {
          resolve(null);
        }
      }, 400);
    });
  }
};