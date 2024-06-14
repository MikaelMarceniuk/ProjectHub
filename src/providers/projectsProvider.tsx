'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import crypto from 'crypto'
import withChildren from '@/@types/withChildren'
import ProjectType from '@/@types/project'
import { useSearchParams } from 'next/navigation'

type ProjectContextType = {
	getProjects: () => ProjectType[]
	createNewProject: (name: string) => void
}

const ProjectContext = createContext<ProjectContextType>(
	{} as ProjectContextType,
)

export const useProjectContext = () => useContext(ProjectContext)

const ProjectsProvider: React.FC<withChildren> = ({ children }) => {
	const searchParams = useSearchParams()
	const [projects, setProjects] = useState<ProjectType[]>([])

	useEffect(() => {
		const appLocaldata = localStorage.getItem('@project-hub/v1.0')
		if (appLocaldata == null) return

		const { projects } = JSON.parse(appLocaldata)
		setProjects(projects)
	}, [])

	const getProjects = () => {
		const query = searchParams.get('query')
		if (!query) return projects

		return projects.filter((p) => p.name.includes(query))
	}

	const createNewProject = (name: string) => {
		const newProject = {
			id: crypto.randomBytes(20).toString('hex'),
			name,
		}

		const appLocaldata = localStorage.getItem('@project-hub/v1.0')
		if (appLocaldata == null) {
			return alert('Error: No local data found when saving project.')
		}

		setProjects((oldValue) => {
			const newProjectsArray = oldValue
				? [...oldValue, newProject]
				: [newProject]

			const updatedLocalData = JSON.parse(appLocaldata)
			updatedLocalData.projects = newProjectsArray

			localStorage.setItem(
				'@project-hub/v1.0',
				JSON.stringify(updatedLocalData),
			)

			return newProjectsArray
		})
	}

	return (
		<ProjectContext.Provider value={{ getProjects, createNewProject }}>
			{children}
		</ProjectContext.Provider>
	)
}

export default ProjectsProvider
