export interface Project {
  name: string;
  description: string;
  html_url: string;
  topics: string[];
  readme_content?: string;
  image_url?: string;
  homepage?: string;
  language?: string;
  stargazers_count?: number;
  forks_count?: number;
}

export interface AnimationVariants {
  hidden?: {
    opacity?: number;
    y?: number;
    scale?: number;
  };
  visible?: {
    opacity?: number;
    y?: number;
    scale?: number;
    transition?: {
      duration?: number;
      delay?: number;
      staggerChildren?: number;
    };
  };
  hover?: {
    opacity?: number;
    y?: number;
    scale?: number;
    transition?: {
      duration: number;
    };
  };
}

export interface ErrorState {
  hasError: boolean;
  message: string;
}

export interface LoadingState {
  isLoading: boolean;
  progress?: number;
} 