export interface Project {
  name: string;
  description: string;
  html_url: string;
  language: string;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  readme_content?: string;
}

export interface ErrorState {
  hasError: boolean;
  message: string;
}

export interface LoadingState {
  isLoading: boolean;
} 