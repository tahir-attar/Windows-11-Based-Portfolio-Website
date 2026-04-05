import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const SKILL_ICONS = [
  { label: 'JavaScript', url: '/assets/portfolio/skills/javascript-original.svg' },
  { label: 'TypeScript', url: '/assets/portfolio/skills/typescript-original.svg' },
  { label: 'React', url: '/assets/portfolio/skills/react-original.svg' },
  { label: 'Next.js', url: '/assets/portfolio/skills/nextjs-original.svg' },
  { label: 'Node.js', url: '/assets/portfolio/skills/nodejs-original.svg' },
  { label: 'PWA', url: '/assets/portfolio/skills/pwa.png' },
  { label: 'Core Web Vitals', url: '/assets/portfolio/skills/vitals.webp' },
  { label: 'Rust', url: '/assets/portfolio/skills/rust-original.svg' },
  { label: 'Web Assembly', url: '/assets/portfolio/skills/wasm.svg' },
  { label: 'AWS', url: '/assets/portfolio/skills/aws.svg' },
  { label: 'Performance', url: '/assets/portfolio/skills/page-speed.png' },
  { label: 'Software Testing', url: '/assets/portfolio/skills/developer.png' },
  { label: 'Responsive Design', url: '/assets/portfolio/skills/responsive.png' },
  { label: 'GitHub', url: '/assets/portfolio/skills/github-original.svg' },
  { label: 'SEO', url: '/assets/portfolio/skills/seo.png' },
  { label: 'Git', url: '/assets/portfolio/skills/git-original.svg' },
  { label: 'Figma', url: '/assets/portfolio/skills/figma-original.svg' },
  { label: 'Vite', url: '/assets/portfolio/skills/vitejs-original.svg' },
  { label: 'Webpack', url: '/assets/portfolio/skills/webpack-original.svg' },
  { label: 'CSS', url: '/assets/portfolio/skills/css3-original.svg' },
  { label: 'Sass', url: '/assets/portfolio/skills/sass-original.svg' },
  { label: 'Redux', url: '/assets/portfolio/skills/redux-original.svg' },
  { label: 'Storybook', url: '/assets/portfolio/skills/storybook.png' },
  { label: 'Jest', url: '/assets/portfolio/skills/jest-plain.svg' },
  { label: 'NestJS', url: '/assets/portfolio/skills/nestjs-original.svg' },
  { label: 'Express', url: '/assets/portfolio/skills/express-original.svg' },
  { label: 'MongoDB', url: '/assets/portfolio/skills/mongodb-original.svg' },
  { label: 'PostgreSQL', url: '/assets/portfolio/skills/postgresql-original.svg' },
  { label: 'MySQL', url: '/assets/portfolio/skills/mysql-original.svg' },
  { label: 'GraphQL', url: '/assets/portfolio/skills/graphql-plain.svg' },
  { label: 'HTML5', url: '/assets/portfolio/skills/html5-original.svg' },
  { label: 'Python', url: '/assets/portfolio/skills/python-original.svg' },
  { label: 'Linux', url: '/assets/portfolio/skills/linux-original.svg' },
  { label: 'npm', url: '/assets/portfolio/skills/npm-original-wordmark.svg' },
  { label: 'Docker', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
  { label: 'TensorFlow', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg' },
  { label: 'PyTorch', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg' },
  { label: 'Keras', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/keras/keras-original.svg' },
  { label: 'Jupyter', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg' },
  { label: 'NumPy', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg' },
  { label: 'Pandas', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg' },
  { label: 'scikit-learn', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg' },
  { label: 'OpenCV', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg' },
  { label: 'OpenAI', url: 'https://cdn.simpleicons.org/anthropic/191919' },
  { label: 'Kaggle', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kaggle/kaggle-original.svg' },
  { label: 'MLflow', url: 'https://cdn.simpleicons.org/mlflow/0194E2' },
  { label: 'spaCy', url: 'https://cdn.simpleicons.org/spacy/09A3D5' },
  { label: 'ONNX', url: 'https://cdn.simpleicons.org/onnx/717272' },
  { label: 'Apache Airflow', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apacheairflow/apacheairflow-original.svg' },
  { label: 'Apache Spark', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachespark/apachespark-original.svg' },
  { label: 'Apache Hadoop', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/hadoop/hadoop-original.svg' },
  { label: 'Apache Kafka', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg' },
  { label: 'Databricks', url: 'https://cdn.simpleicons.org/databricks/FF3621' },
  { label: 'Snowflake', url: 'https://cdn.simpleicons.org/snowflake/29B5E8' },
  { label: 'Tableau', url: 'https://cdn.simpleicons.org/grafana/F46800' },
  { label: 'Power BI', url: 'https://cdn.simpleicons.org/qlik/009848' },
  { label: 'Bootstrap', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg' },
  { label: 'jQuery', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jquery/jquery-original.svg' },
  { label: 'Gatsby', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gatsby/gatsby-original.svg' },
  { label: 'Nuxt.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nuxtjs/nuxtjs-original.svg' },
  { label: 'Electron', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/electron/electron-original.svg' },
  { label: 'Three.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg' },
  { label: 'D3.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/d3js/d3js-original.svg' },
  { label: 'GitLab', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg' },
  { label: 'Bitbucket', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bitbucket/bitbucket-original.svg' },
  { label: 'Jenkins', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg' },
  { label: 'Jira', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg' },
  { label: 'Google Cloud', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg' },
  { label: 'Microsoft Azure', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg' },
  { label: 'Kubernetes', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg' },
  { label: 'Terraform', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg' },
  { label: 'Ansible', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ansible/ansible-original.svg' },
  { label: 'Arduino', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg' },
  { label: 'Raspberry Pi', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/raspberrypi/raspberrypi-original.svg' },
  { label: 'Framer', url: 'https://cdn.simpleicons.org/framer/0055FF' },
  { label: 'Chakra UI', url: 'https://cdn.simpleicons.org/chakraui/319795' },
  { label: 'Ant Design', url: 'https://cdn.simpleicons.org/antdesign/0170FE' },
  { label: 'Babel', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/babel/babel-original.svg' },
  { label: 'Prettier', url: 'https://cdn.simpleicons.org/prettier/F7B93E' },
  { label: 'ESLint', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/eslint/eslint-original.svg' },
  { label: 'Remix', url: 'https://cdn.simpleicons.org/remix/000000' },
  { label: 'Astro', url: 'https://cdn.simpleicons.org/astro/BC52EE' },
  { label: 'Ionic', url: 'https://cdn.simpleicons.org/ionic/3880FF' },
  { label: 'Capacitor', url: 'https://cdn.simpleicons.org/capacitor/119EFF' },
  { label: 'Tauri', url: 'https://cdn.simpleicons.org/tauri/FFC131' },
  { label: 'Ember.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ember/ember-original.svg' },
  { label: 'Redis', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg' },
  { label: 'Nginx', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg' },
  { label: 'Firebase', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg' },
  { label: 'Tailwind CSS', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { label: 'Vue.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg' },
  { label: 'Angular', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg' },
  { label: 'Swift', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg' },
  { label: 'Kotlin', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg' },
  { label: 'Flutter', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg' },
  { label: 'Django', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg' },
  { label: 'Flask', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg' },
  { label: 'Ruby', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-original.svg' },
  { label: 'Go', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg' },
  { label: 'Svelte', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg' },
  { label: 'PHP', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
  { label: 'Apollo', url: 'https://cdn.simpleicons.org/apollographql/311C87' },
  { label: 'Prisma', url: 'https://cdn.simpleicons.org/prisma/2D3748' },
  { label: 'Stripe', url: 'https://cdn.simpleicons.org/stripe/008CDD' },
  { label: 'WordPress', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-original.svg' },
  { label: 'Supabase', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg' },
  { label: 'PlanetScale', url: 'https://cdn.simpleicons.org/planetscale/000000' },
  { label: 'Neon', url: 'https://cdn.simpleicons.org/postgresql/316192' },
  { label: 'Cassandra', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cassandra/cassandra-original.svg' },
  { label: 'DynamoDB', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dynamodb/dynamodb-original.svg' },
  { label: 'CouchDB', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/couchdb/couchdb-original.svg' },
  { label: 'MariaDB', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mariadb/mariadb-original.svg' },
  { label: 'SQLite', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg' },
  { label: 'InfluxDB', url: 'https://cdn.simpleicons.org/influxdb/22ADF6' },
  { label: 'Hugging Face', url: 'https://cdn.simpleicons.org/huggingface/FFD21E' },
  { label: 'LangChain', url: 'https://cdn.simpleicons.org/langchain/1C3C3C' },
  { label: 'LangGraph', url: 'https://cdn.simpleicons.org/langchain/2E8B57' },
  { label: 'LlamaIndex', url: 'https://cdn.simpleicons.org/meta/0081FB' },
  { label: 'FastAPI', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
  { label: 'Gradio', url: 'https://cdn.simpleicons.org/gradio/FF7C00' },
  { label: 'Streamlit', url: 'https://cdn.simpleicons.org/streamlit/FF4B4B' },
  { label: 'Weights & Biases', url: 'https://cdn.simpleicons.org/weightsandbiases/FFBE00' },
  { label: 'DeepSpeed', url: 'https://cdn.simpleicons.org/pytorch/EE4C2C' },
  { label: 'Ray', url: 'https://cdn.simpleicons.org/ray/028CF0' },
  { label: 'AutoGluon', url: 'https://cdn.simpleicons.org/scikitlearn/F7931E' },
  { label: 'Matplotlib', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg' },
  { label: 'Seaborn', url: 'https://cdn.simpleicons.org/scikitlearn/3776AB' },
  { label: 'Plotly', url: 'https://cdn.simpleicons.org/plotly/3F4F75' },
  { label: 'Polars', url: 'https://cdn.simpleicons.org/polars/CD792C' },
  { label: 'DuckDB', url: 'https://cdn.simpleicons.org/duckdb/FFF000' },
  { label: 'Excel', url: 'https://cdn.simpleicons.org/googlesheets/34A853' },
  { label: 'Google Analytics', url: 'https://cdn.simpleicons.org/googleanalytics/E37400' },
  { label: 'Looker', url: 'https://cdn.simpleicons.org/looker/4285F4' },
  { label: 'Apache Superset', url: 'https://cdn.simpleicons.org/apachesuperset/20A7C9' },
  { label: 'TanStack Query', url: 'https://cdn.simpleicons.org/reactquery/FF4154' },
  { label: 'Zustand', url: 'https://cdn.simpleicons.org/redux/764ABC' },
  { label: 'ShadCN UI', url: 'https://cdn.simpleicons.org/shadcnui/000000' },
  { label: 'Radix UI', url: 'https://cdn.simpleicons.org/radixui/161618' },
  { label: 'Clerk', url: 'https://cdn.simpleicons.org/clerk/6C47FF' },
  { label: 'Auth0', url: 'https://cdn.simpleicons.org/auth0/EB5424' },
  { label: 'WebRTC', url: 'https://cdn.simpleicons.org/webrtc/333333' },
  { label: 'Helm', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/helm/helm-original.svg' },
  { label: 'ArgoCD', url: 'https://cdn.simpleicons.org/argo/EF7B4D' },
  { label: 'Prometheus', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prometheus/prometheus-original.svg' },
  { label: 'Grafana', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg' },
  { label: 'Istio', url: 'https://cdn.simpleicons.org/istio/466BB0' },
  { label: 'Envoy', url: 'https://cdn.simpleicons.org/envoyproxy/AC6199' },
  { label: 'Vault', url: 'https://cdn.simpleicons.org/vault/FFEC6E' },
  { label: 'CircleCI', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/circleci/circleci-plain.svg' },
  { label: 'GitHub Actions', url: 'https://cdn.simpleicons.org/githubactions/2088FF' },
  { label: 'Pulumi', url: 'https://cdn.simpleicons.org/pulumi/8A3391' },
  { label: 'K3s', url: 'https://cdn.simpleicons.org/k3s/FFC61C' },
  { label: 'OpenShift', url: 'https://cdn.simpleicons.org/redhatopenshift/EE0000' },
  { label: 'Rancher', url: 'https://cdn.simpleicons.org/rancher/0075A8' },
  { label: 'Knative', url: 'https://cdn.simpleicons.org/knative/0865AD' },
  { label: 'Containerd', url: 'https://cdn.simpleicons.org/containerd/575757' },
  { label: 'LeetCode', url: 'https://cdn.simpleicons.org/leetcode/FFA116' },
  { label: 'CodeChef', url: 'https://cdn.simpleicons.org/codechef/5B4638' },
  { label: 'Codeforces', url: 'https://cdn.simpleicons.org/codeforces/1F8ACB' },
  { label: 'HackerRank', url: 'https://cdn.simpleicons.org/hackerrank/2EC866' },
  { label: 'GeeksForGeeks', url: 'https://cdn.simpleicons.org/geeksforgeeks/2F8D46' },
  { label: 'PyCharm', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pycharm/pycharm-original.svg' },
  { label: 'YOLO', url: 'https://cdn.simpleicons.org/yolo/00FFFF' },
  // C / C++
  { label: 'C', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg' },
  { label: 'C++', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
  { label: 'CMake', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cmake/cmake-original.svg' },
  { label: 'Qt', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/qt/qt-original.svg' },
  { label: 'OpenGL', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opengl/opengl-original.svg' },
  { label: 'CUDA', url: '/assets/portfolio/skills/cuda.svg' },
  { label: 'GDB', url: 'https://cdn.simpleicons.org/gnu/A42E2B' },
  // Java
  { label: 'Java', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { label: 'Spring Boot', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
  { label: 'Maven', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/maven/maven-original.svg' },
  { label: 'Gradle', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gradle/gradle-original.svg' },
  { label: 'Hibernate', url: 'https://cdn.simpleicons.org/hibernate/59666C' },
  { label: 'JUnit', url: 'https://cdn.simpleicons.org/junit5/25A162' },
  { label: 'Tomcat', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tomcat/tomcat-original.svg' },
  { label: 'IntelliJ IDEA', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg' },
  // JavaScript packages
  { label: 'Lodash', url: 'https://cdn.simpleicons.org/lodash/3492FF' },
  { label: 'Axios', url: 'https://cdn.simpleicons.org/axios/5A29E4' },
  { label: 'Socket.io', url: 'https://cdn.simpleicons.org/socketdotio/010101' },
  { label: 'Moment.js', url: '/assets/portfolio/skills/momentjs.svg' },
  { label: 'Chart.js', url: 'https://cdn.simpleicons.org/chartdotjs/FF6384' },
  { label: 'RxJS', url: 'https://cdn.simpleicons.org/reactivex/B7178C' },
  { label: 'Vitest', url: 'https://cdn.simpleicons.org/vitest/6E9F18' },
  { label: 'Cypress', url: 'https://cdn.simpleicons.org/cypress/17202C' },
  { label: 'Playwright', url: '/assets/portfolio/skills/playwright.svg' },
  { label: 'Zod', url: 'https://cdn.simpleicons.org/zod/3E67B1' },
  { label: 'pnpm', url: 'https://cdn.simpleicons.org/pnpm/F69220' },
  { label: 'Yarn', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/yarn/yarn-original.svg' },
  { label: 'Rollup', url: 'https://cdn.simpleicons.org/rollupdotjs/EC4A3F' },
  { label: 'MobX', url: 'https://cdn.simpleicons.org/mobx/FF7102' },
  { label: 'Turborepo', url: 'https://cdn.simpleicons.org/turborepo/EF4444' },
  // Python packages
  { label: 'SciPy', url: 'https://cdn.simpleicons.org/scipy/8CAAE6' },
  { label: 'Celery', url: 'https://cdn.simpleicons.org/celery/37814A' },
  { label: 'SQLAlchemy', url: 'https://cdn.simpleicons.org/sqlalchemy/D71F00' },
  { label: 'Scrapy', url: 'https://cdn.simpleicons.org/scrapy/60A839' },
  { label: 'pytest', url: 'https://cdn.simpleicons.org/pytest/0A9EDC' },
  { label: 'Poetry', url: 'https://cdn.simpleicons.org/poetry/60A5FA' },
  { label: 'Pydantic', url: 'https://cdn.simpleicons.org/pydantic/E92063' },
  { label: 'Anaconda', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/anaconda/anaconda-original.svg' },
  { label: 'pip', url: 'https://cdn.simpleicons.org/pypi/3775A9' },
  { label: 'Uvicorn', url: 'https://cdn.simpleicons.org/fastapi/009688' },
];

const S = {
  page: { minHeight: '100vh', background: '#0d0d0d', fontFamily: "'Poppins', sans-serif", color: '#fff' } as React.CSSProperties,
  header: { background: '#111', borderBottom: '1px solid #222', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' as const } as React.CSSProperties,
  logo: { fontSize: '1.4rem', fontWeight: 700 } as React.CSSProperties,
  logoAccent: { color: '#2bff88' } as React.CSSProperties,
  nav: { display: 'flex', gap: '12px', alignItems: 'center' } as React.CSSProperties,
  navBtn: (active: boolean) => ({ background: active ? '#2bff88' : '#252525', color: active ? '#000' : '#fff', border: '1px solid #333', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer', fontWeight: active ? 700 : 400, fontSize: '0.875rem' } as React.CSSProperties),
  logoutBtn: { background: 'transparent', color: '#888', border: '1px solid #333', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer', fontSize: '0.875rem' } as React.CSSProperties,
  content: { padding: '32px', maxWidth: '1000px' } as React.CSSProperties,
  sectionTitle: { fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' } as React.CSSProperties,
  sectionSub: { color: '#888', fontSize: '0.875rem', marginBottom: '32px' } as React.CSSProperties,
  card: { background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '24px', marginBottom: '20px' } as React.CSSProperties,
  cardTitle: { fontSize: '0.8rem', fontWeight: 700, marginBottom: '16px', color: '#2bff88', textTransform: 'uppercase' as const, letterSpacing: '1px' } as React.CSSProperties,
  formRow: { marginBottom: '16px' } as React.CSSProperties,
  label: { display: 'block', color: '#aaa', fontSize: '0.72rem', textTransform: 'uppercase' as const, letterSpacing: '1px', marginBottom: '6px' } as React.CSSProperties,
  input: { width: '100%', background: '#252525', border: '1px solid #444', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' as const } as React.CSSProperties,
  boxCard: { background: '#111', border: '1px solid #2a2a2a', borderRadius: '10px', padding: '20px', marginBottom: '16px' } as React.CSSProperties,
  boxHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' } as React.CSSProperties,
  removeBtn: { background: '#1a0a0a', color: '#ff4d4d', border: '1px solid #3a1a1a', borderRadius: '6px', padding: '6px 12px', cursor: 'pointer', fontSize: '0.75rem' } as React.CSSProperties,
  addBoxBtn: { background: '#252525', color: '#2bff88', border: '1px solid #2bff88', borderRadius: '6px', padding: '10px 18px', cursor: 'pointer', fontSize: '0.85rem', marginTop: '8px' } as React.CSSProperties,
  addItemBtn: { background: '#1a1a1a', color: '#2bff88', border: '1px solid #2a2a2a', borderRadius: '6px', padding: '6px 12px', cursor: 'pointer', fontSize: '0.75rem', marginTop: '8px' } as React.CSSProperties,
  iconGrid: { display: 'flex', flexWrap: 'wrap' as const, gap: '6px', background: '#0d0d0d', borderRadius: '8px', padding: '12px', maxHeight: '200px', overflowY: 'auto' as const, border: '1px solid #333' } as React.CSSProperties,
  iconItem: (selected: boolean) => ({ background: selected ? '#2bff88' : '#252525', border: `1px solid ${selected ? '#2bff88' : '#333'}`, borderRadius: '6px', padding: '6px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem', color: selected ? '#000' : '#ccc' } as React.CSSProperties),
  selectedIconsWrap: { display: 'flex', flexWrap: 'wrap' as const, gap: '8px', marginTop: '10px' } as React.CSSProperties,
  selectedIcon: { display: 'flex', alignItems: 'center', gap: '6px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '6px', padding: '4px 8px', fontSize: '0.72rem' } as React.CSSProperties,
  removeIconBtn: { background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '0.9rem', padding: '0', lineHeight: 1 } as React.CSSProperties,
  techRow: { display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '8px', alignItems: 'center', marginBottom: '8px' } as React.CSSProperties,
  smallInput: { background: '#252525', border: '1px solid #444', borderRadius: '6px', padding: '8px 10px', color: '#fff', fontSize: '0.8rem', outline: 'none', boxSizing: 'border-box' as const, width: '100%' } as React.CSSProperties,
  saveBar: { position: 'sticky' as const, bottom: 0, background: '#111', borderTop: '1px solid #222', padding: '16px 32px', display: 'flex', gap: '12px', alignItems: 'center' } as React.CSSProperties,
  saveBtn: { background: '#2bff88', color: '#000', border: 'none', borderRadius: '8px', padding: '13px 32px', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' } as React.CSSProperties,
  status: { color: '#888', fontSize: '0.85rem' } as React.CSSProperties,
  iconSearch: { width: '100%', background: '#252525', border: '1px solid #444', borderRadius: '6px', padding: '8px 10px', color: '#fff', fontSize: '0.8rem', outline: 'none', boxSizing: 'border-box' as const, marginBottom: '8px' } as React.CSSProperties,
};

interface SkillBoxIcon {
  label: string;
  iconUrl: string;
}

interface TechSkillRow {
  id: string;
  section: string;
  value: string;
}

interface SkillBox {
  id: string;
  header: string;
  icons: SkillBoxIcon[];
  techSkills: TechSkillRow[];
}

interface AboutSkillsData {
  subtitleText: string;
  skillBoxes: SkillBox[];
}

const defaultData: AboutSkillsData = {
  subtitleText: 'Languages I speak, Dev & Design Tools that I particularly enjoy',
  skillBoxes: [],
};

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function AdminAbout() {
  const router = useRouter();
  const [data, setData] = useState<AboutSkillsData>(defaultData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const [iconSearch, setIconSearch] = useState<{ [boxId: string]: string }>({});

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/about');
      if (res.status === 401) { router.push('/admin'); return; }
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setStatus('');
    try {
      const res = await fetch('/api/admin/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) setStatus('Saved successfully!');
      else setStatus('Save failed. Check auth.');
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  }

  function addBox() {
    const newBox: SkillBox = {
      id: generateId(),
      header: '',
      icons: [],
      techSkills: [],
    };
    setData((d) => ({ ...d, skillBoxes: [...d.skillBoxes, newBox] }));
  }

  function removeBox(boxId: string) {
    setData((d) => ({ ...d, skillBoxes: d.skillBoxes.filter((b) => b.id !== boxId) }));
  }

  function setBoxHeader(boxId: string, value: string) {
    setData((d) => ({
      ...d,
      skillBoxes: d.skillBoxes.map((b) => b.id === boxId ? { ...b, header: value } : b),
    }));
  }

  function toggleIcon(boxId: string, icon: SkillBoxIcon) {
    setData((d) => ({
      ...d,
      skillBoxes: d.skillBoxes.map((b) => {
        if (b.id !== boxId) return b;
        const exists = b.icons.some((i) => i.iconUrl === icon.iconUrl);
        return {
          ...b,
          icons: exists
            ? b.icons.filter((i) => i.iconUrl !== icon.iconUrl)
            : [...b.icons, icon],
        };
      }),
    }));
  }

  function removeIcon(boxId: string, iconUrl: string) {
    setData((d) => ({
      ...d,
      skillBoxes: d.skillBoxes.map((b) =>
        b.id === boxId ? { ...b, icons: b.icons.filter((i) => i.iconUrl !== iconUrl) } : b
      ),
    }));
  }

  function addTechSkill(boxId: string) {
    setData((d) => ({
      ...d,
      skillBoxes: d.skillBoxes.map((b) =>
        b.id === boxId
          ? { ...b, techSkills: [...b.techSkills, { id: generateId(), section: '', value: '' }] }
          : b
      ),
    }));
  }

  function setTechSkill(boxId: string, skillId: string, field: 'section' | 'value', value: string) {
    setData((d) => ({
      ...d,
      skillBoxes: d.skillBoxes.map((b) =>
        b.id === boxId
          ? {
              ...b,
              techSkills: b.techSkills.map((ts) =>
                ts.id === skillId ? { ...ts, [field]: value } : ts
              ),
            }
          : b
      ),
    }));
  }

  function removeTechSkill(boxId: string, skillId: string) {
    setData((d) => ({
      ...d,
      skillBoxes: d.skillBoxes.map((b) =>
        b.id === boxId
          ? { ...b, techSkills: b.techSkills.filter((ts) => ts.id !== skillId) }
          : b
      ),
    }));
  }

  if (loading) return <div style={{ ...S.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;

  return (
    <>
      <Head><title>About Skills — Admin</title></Head>
      <div style={S.page}>
        <header style={S.header}>
          <div style={S.logo}><span style={S.logoAccent}>T</span>AHIR Admin</div>
          <nav style={S.nav}>
            <button style={S.navBtn(false)} onClick={() => router.push('/admin/projects')}>Projects</button>
            <button style={S.navBtn(false)} onClick={() => router.push('/admin/resume')}>Resume</button>
            <button style={S.navBtn(true)} onClick={() => router.push('/admin/about')}>About</button>
            <button style={S.navBtn(false)} onClick={() => router.push('/admin/comments')}>Comments</button>
            <button style={S.navBtn(false)} onClick={() => router.push('/admin/articles')}>Articles</button>
            <button style={S.logoutBtn} onClick={handleLogout}>Sign Out</button>
          </nav>
        </header>

        <div style={S.content}>
          <h1 style={S.sectionTitle}>About — Skills Section</h1>
          <p style={S.sectionSub}>Manage the Skills section that appears on your About page. Changes are reflected immediately.</p>

          <div style={S.card}>
            <div style={S.cardTitle}>Section Header</div>
            <p style={{ color: '#555', fontSize: '0.8rem', marginBottom: '12px' }}>The header "Skills" is fixed. You can update the subtitle below.</p>
            <div style={S.formRow}>
              <label style={S.label}>Subtitle Text</label>
              <input
                style={S.input}
                value={data.subtitleText}
                onChange={(e) => setData((d) => ({ ...d, subtitleText: e.target.value }))}
                placeholder="Languages I speak, Dev & Design Tools that I particularly enjoy"
              />
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>Skill Boxes</div>
            <p style={{ color: '#555', fontSize: '0.8rem', marginBottom: '16px' }}>
              Each box appears as a glass card. Two boxes per row — the third automatically wraps to a new row with the same light effects.
            </p>

            {data.skillBoxes.map((box, idx) => {
              const search = iconSearch[box.id] || '';
              const filtered = SKILL_ICONS.filter((ic) =>
                ic.label.toLowerCase().includes(search.toLowerCase())
              );

              return (
                <div key={box.id} style={S.boxCard}>
                  <div style={S.boxHeader}>
                    <span style={{ color: '#2bff88', fontWeight: 700, fontSize: '0.85rem' }}>Box {idx + 1}</span>
                    <button style={S.removeBtn} onClick={() => removeBox(box.id)}>Remove Box</button>
                  </div>

                  <div style={S.formRow}>
                    <label style={S.label}>Box Header (e.g. Frontend, Backend)</label>
                    <input
                      style={S.input}
                      value={box.header}
                      onChange={(e) => setBoxHeader(box.id, e.target.value)}
                      placeholder="Frontend"
                    />
                  </div>

                  <div style={S.formRow}>
                    <label style={S.label}>Skill Icons</label>
                    <p style={{ color: '#555', fontSize: '0.72rem', marginBottom: '8px' }}>Search and click to toggle icons. Selected icons appear with the animated hover label on the live site.</p>

                    <input
                      style={S.iconSearch}
                      value={search}
                      onChange={(e) => setIconSearch((s) => ({ ...s, [box.id]: e.target.value }))}
                      placeholder="Search icons..."
                    />

                    <div style={S.iconGrid}>
                      {filtered.map((ic) => {
                        const selected = box.icons.some((i) => i.iconUrl === ic.url);
                        return (
                          <button
                            key={ic.url + ic.label}
                            style={S.iconItem(selected)}
                            onClick={() => toggleIcon(box.id, { label: ic.label, iconUrl: ic.url })}
                          >
                            <img
                              src={ic.url}
                              alt={ic.label}
                              style={{ width: 20, height: 20, objectFit: 'contain' }}
                              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                            />
                            {ic.label}
                          </button>
                        );
                      })}
                    </div>

                    {box.icons.length > 0 && (
                      <div style={S.selectedIconsWrap}>
                        {box.icons.map((ic) => (
                          <div key={ic.iconUrl} style={S.selectedIcon}>
                            {ic.iconUrl && (
                              <img src={ic.iconUrl} alt={ic.label} style={{ width: 18, height: 18, objectFit: 'contain' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                            )}
                            <span style={{ color: '#ccc' }}>{ic.label}</span>
                            <button style={S.removeIconBtn} onClick={() => removeIcon(box.id, ic.iconUrl)}>✕</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div style={S.formRow}>
                    <label style={S.label}>Tech Skills List (green title on left, white content on right)</label>
                    {box.techSkills.map((ts) => (
                      <div key={ts.id} style={S.techRow}>
                        <input
                          style={S.smallInput}
                          value={ts.section}
                          onChange={(e) => setTechSkill(box.id, ts.id, 'section', e.target.value)}
                          placeholder="Languages"
                        />
                        <input
                          style={S.smallInput}
                          value={ts.value}
                          onChange={(e) => setTechSkill(box.id, ts.id, 'value', e.target.value)}
                          placeholder="JavaScript, TypeScript"
                        />
                        <button style={S.removeBtn} onClick={() => removeTechSkill(box.id, ts.id)}>✕</button>
                      </div>
                    ))}
                    <button style={S.addItemBtn} onClick={() => addTechSkill(box.id)}>+ Add Row</button>
                  </div>
                </div>
              );
            })}

            <button style={S.addBoxBtn} onClick={addBox}>+ Add Skill Box</button>
          </div>
        </div>

        <div style={S.saveBar}>
          <button style={S.saveBtn} onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          {status && <span style={S.status}>{status}</span>}
        </div>
      </div>
    </>
  );
}
