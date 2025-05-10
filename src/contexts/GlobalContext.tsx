import { Component } from "@/types/Util"
import { SidebarContextProvider } from "./SidebarContext"

export const GlobalContextProvider:Component = ({ children }) => {
	return (
		<SidebarContextProvider>
		{children}
		</SidebarContextProvider>
	)
}