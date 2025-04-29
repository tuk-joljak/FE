import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/", // API 기본 URL
  timeout: 10000, // 요청 제한시간 5초
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    // 토큰이 필요한 경우, localStorage에서 가져와서 헤더에 추가
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 에러 처리
    if (error.response) {
      // 401 인증 에러 처리
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        // 로그인 페이지로 리다이렉트 등의 처리
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
