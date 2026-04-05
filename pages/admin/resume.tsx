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
  { label: 'Apache Hive', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/hadoop/hadoop-original.svg' },
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
  { label: 'Supabase Auth', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg' },
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

const BULLET_ICONS = [
  { label: 'Menu', url: '/assets/portfolio/bullets/menu.svg' },
  { label: 'Options', url: '/assets/portfolio/bullets/options.svg' },
  { label: 'Asterisk', url: '/assets/portfolio/bullets/asterisk.svg' },
  { label: 'Star', url: '/assets/portfolio/bullets/star.svg' },
  { label: 'Dot', url: '/assets/portfolio/bullets/dot.svg' },
  { label: 'Check', url: '/assets/portfolio/bullets/check.svg' },
  { label: 'Arrow', url: '/assets/portfolio/bullets/arrow.svg' },
];


const S = {
  page: { minHeight: '100vh', background: '#0d0d0d', fontFamily: "'Poppins', sans-serif", color: '#fff' } as React.CSSProperties,
  header: { background: '#111', borderBottom: '1px solid #222', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' as const } as React.CSSProperties,
  logo: { fontSize: '1.4rem', fontWeight: 700 } as React.CSSProperties,
  logoAccent: { color: '#2bff88' } as React.CSSProperties,
  nav: { display: 'flex', gap: '12px', alignItems: 'center' } as React.CSSProperties,
  navBtn: (active: boolean) => ({ background: active ? '#2bff88' : '#252525', color: active ? '#000' : '#fff', border: '1px solid #333', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer', fontWeight: active ? 700 : 400, fontSize: '0.875rem' } as React.CSSProperties),
  logoutBtn: { background: 'transparent', color: '#888', border: '1px solid #333', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer', fontSize: '0.875rem' } as React.CSSProperties,
  content: { padding: '32px', maxWidth: '900px' } as React.CSSProperties,
  sectionTitle: { fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' } as React.CSSProperties,
  sectionSub: { color: '#888', fontSize: '0.875rem', marginBottom: '32px' } as React.CSSProperties,
  card: { background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '24px', marginBottom: '20px' } as React.CSSProperties,
  cardTitle: { fontWeight: 700, marginBottom: '16px', color: '#2bff88', textTransform: 'uppercase' as const, fontSize: '0.8rem', letterSpacing: '1px' } as React.CSSProperties,
  formRow: { marginBottom: '16px' } as React.CSSProperties,
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' } as React.CSSProperties,
  label: { display: 'block', color: '#aaa', fontSize: '0.72rem', textTransform: 'uppercase' as const, letterSpacing: '1px', marginBottom: '6px' } as React.CSSProperties,
  input: { width: '100%', background: '#252525', border: '1px solid #444', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' as const } as React.CSSProperties,
  textarea: { width: '100%', background: '#252525', border: '1px solid #444', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' as const, minHeight: '90px', resize: 'vertical' as const } as React.CSSProperties,
  skillList: { display: 'flex', flexDirection: 'column' as const, gap: '8px' } as React.CSSProperties,
  skillItem: { display: 'grid', gridTemplateColumns: '40px 1fr 1fr auto', gap: '8px', alignItems: 'center', background: '#111', borderRadius: '8px', padding: '8px' } as React.CSSProperties,
  skillImg: { width: '32px', height: '32px', objectFit: 'contain' as const } as React.CSSProperties,
  removeBtn: { background: '#1a0a0a', color: '#ff4d4d', border: '1px solid #3a1a1a', borderRadius: '6px', padding: '6px 10px', cursor: 'pointer', fontSize: '0.75rem', whiteSpace: 'nowrap' as const } as React.CSSProperties,
  addSkillRow: { display: 'flex', gap: '8px', marginTop: '8px', alignItems: 'center', flexWrap: 'wrap' as const } as React.CSSProperties,
  iconPickerWrap: { background: '#111', border: '1px solid #333', borderRadius: '8px', padding: '12px', maxHeight: '180px', overflowY: 'auto' as const, display: 'flex', flexWrap: 'wrap' as const, gap: '8px' } as React.CSSProperties,
  iconPickerItem: (sel: boolean) => ({ background: sel ? '#2bff88' : '#252525', border: `1px solid ${sel ? '#2bff88' : '#333'}`, borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: sel ? '#000' : '#ccc' } as React.CSSProperties),
  addRowBtn: { background: '#252525', color: '#2bff88', border: '1px solid #2bff88', borderRadius: '6px', padding: '8px 14px', cursor: 'pointer', fontSize: '0.8rem', marginTop: '8px' } as React.CSSProperties,
  expCard: { background: '#111', border: '1px solid #2a2a2a', borderRadius: '10px', padding: '16px', marginBottom: '12px' } as React.CSSProperties,
  expHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' } as React.CSSProperties,
  respItem: { display: 'grid', gridTemplateColumns: '40px 1fr 1fr auto', gap: '8px', alignItems: 'center', background: '#0d0d0d', borderRadius: '6px', padding: '8px', marginBottom: '6px' } as React.CSSProperties,
  saveBar: { position: 'sticky' as const, bottom: 0, background: '#111', borderTop: '1px solid #222', padding: '16px 32px', display: 'flex', gap: '12px', alignItems: 'center' } as React.CSSProperties,
  saveBtn: { background: '#2bff88', color: '#000', border: 'none', borderRadius: '8px', padding: '13px 32px', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' } as React.CSSProperties,
  status: { color: '#888', fontSize: '0.85rem' } as React.CSSProperties,
  smallInput: { background: '#252525', border: '1px solid #444', borderRadius: '6px', padding: '8px 10px', color: '#fff', fontSize: '0.8rem', outline: 'none', boxSizing: 'border-box' as const, width: '100%' } as React.CSSProperties,
  hint: { color: '#555', fontSize: '0.72rem', marginTop: '4px' } as React.CSSProperties,
  seedBtn: { background: '#252525', color: '#2bff88', border: '1px solid #2bff88', borderRadius: '8px', padding: '13px 24px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' } as React.CSSProperties,
};

interface Skill { text: string; iconUrl: string }
interface Responsibility { text: string; iconUrl: string; url?: string }
interface Experience {
  variant: 'withResponsibilities' | 'simple';
  company: string;
  companyImg: string;
  role: string;
  timeFrame: string;
  shortSummary: string;
  responsibilities: Responsibility[];
}
interface Education { degree: string; field: string; institution: string; duration: string; cgpa: string; percentage: string }
interface Certification { company: string; companyImg?: string; certificationName: string; timeFrame: string; description: string; url: string; bullets: Responsibility[] }
interface PersonalInfo {
  name: string; suffix: string; title: string;
  website: string; email: string; phone: string; location: string;
  linkedinUrl: string; githubUrl: string; cvPdfUrl: string;
}
interface NonTechSkillGroup { category: string; items: string[]; iconUrl?: string }
interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experienceIntro: string;
  keyTechSkills: Skill[];
  otherSkills: Skill[];
  nonTechSkills: NonTechSkillGroup[];
  hobbies: Skill[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
}

const defaultResume: ResumeData = {
  personalInfo: { name: '', suffix: '', title: '', website: '', email: '', phone: '', location: '', linkedinUrl: '', githubUrl: '', cvPdfUrl: '' },
  summary: '',
  experienceIntro: '',
  keyTechSkills: [],
  otherSkills: [],
  nonTechSkills: [],
  hobbies: [],
  experience: [],
  education: [],
  certifications: [],
};

export default function AdminResume() {
  const router = useRouter();
  const [data, setData] = useState<ResumeData>(defaultResume);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const [seeding, setSeeding] = useState(false);
  const [iconPickerTarget, setIconPickerTarget] = useState<{ section: 'key' | 'other' | 'hobbies'; idx: number } | null>(null);
  const [certBulletPicker, setCertBulletPicker] = useState<{ certIdx: number; bIdx: number } | null>(null);
  const [certBulletSearch, setCertBulletSearch] = useState('');

  useEffect(() => { loadResume(); }, []);

  async function loadResume() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/resume');
      if (res.status === 401) { router.push('/admin'); return; }
      if (res.ok) {
        const fetched = await res.json();
        setData({ ...defaultResume, ...fetched });
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setStatus('');
    try {
      const res = await fetch('/api/admin/resume', {
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

  async function handleSeed() {
    if (!confirm('Seed initial resume data?')) return;
    setSeeding(true);
    try {
      await fetch('/api/admin/seed?target=resume', { method: 'POST' });
      await loadResume();
    } finally {
      setSeeding(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  }

  function setPI(field: keyof PersonalInfo, value: string) {
    setData((d) => ({ ...d, personalInfo: { ...d.personalInfo, [field]: value } }));
  }

  function sectionKey(section: 'key' | 'other' | 'hobbies') {
    return section === 'key' ? 'keyTechSkills' : section === 'other' ? 'otherSkills' : 'hobbies';
  }

  function setSkill(section: 'key' | 'other' | 'hobbies', idx: number, field: keyof Skill, value: string) {
    const key = sectionKey(section);
    setData((d) => {
      const arr = [...((d[key] as Skill[]) || [])];
      arr[idx] = { ...arr[idx], [field]: value };
      return { ...d, [key]: arr };
    });
  }

  function addSkill(section: 'key' | 'other' | 'hobbies') {
    const key = sectionKey(section);
    setData((d) => ({ ...d, [key]: [...((d[key] as Skill[]) || []), { text: '', iconUrl: '/assets/portfolio/skills/check.svg' }] }));
  }

  function removeSkill(section: 'key' | 'other' | 'hobbies', idx: number) {
    const key = sectionKey(section);
    setData((d) => ({ ...d, [key]: ((d[key] as Skill[]) || []).filter((_, i) => i !== idx) }));
  }

  function addExp() {
    setData((d) => ({
      ...d,
      experience: [...d.experience, {
        variant: 'withResponsibilities', company: '', companyImg: '',
        role: '', timeFrame: '', shortSummary: '', responsibilities: [],
      }],
    }));
  }

  function removeExp(idx: number) {
    setData((d) => ({ ...d, experience: d.experience.filter((_, i) => i !== idx) }));
  }

  function setExp(idx: number, field: keyof Experience, value: unknown) {
    setData((d) => {
      const arr = [...d.experience];
      arr[idx] = { ...arr[idx], [field]: value };
      return { ...d, experience: arr };
    });
  }

  function addResp(expIdx: number) {
    setData((d) => {
      const arr = [...d.experience];
      arr[expIdx] = {
        ...arr[expIdx],
        responsibilities: [...(arr[expIdx].responsibilities || []), { text: '', iconUrl: '/assets/portfolio/check.svg' }],
      };
      return { ...d, experience: arr };
    });
  }

  function setResp(expIdx: number, respIdx: number, field: keyof Responsibility, value: string) {
    setData((d) => {
      const exps = [...d.experience];
      const resps = [...(exps[expIdx].responsibilities || [])];
      resps[respIdx] = { ...resps[respIdx], [field]: value };
      exps[expIdx] = { ...exps[expIdx], responsibilities: resps };
      return { ...d, experience: exps };
    });
  }

  function removeResp(expIdx: number, respIdx: number) {
    setData((d) => {
      const exps = [...d.experience];
      exps[expIdx] = {
        ...exps[expIdx],
        responsibilities: exps[expIdx].responsibilities.filter((_, i) => i !== respIdx),
      };
      return { ...d, experience: exps };
    });
  }

  function addEdu() {
    setData((d) => ({ ...d, education: [...d.education, { degree: '', field: '', institution: '', duration: '', cgpa: '', percentage: '' }] }));
  }

  function addCert() {
    setData((d) => ({ ...d, certifications: [...(d.certifications || []), { company: '', companyImg: '', certificationName: '', timeFrame: '', description: '', url: '', bullets: [] }] }));
  }

  function removeCert(idx: number) {
    setData((d) => ({ ...d, certifications: (d.certifications || []).filter((_, i) => i !== idx) }));
  }

  function setCert(idx: number, field: keyof Certification, value: string) {
    setData((d) => {
      const arr = [...(d.certifications || [])];
      arr[idx] = { ...arr[idx], [field]: value };
      return { ...d, certifications: arr };
    });
  }

  function addCertBullet(certIdx: number) {
    setData((d) => {
      const arr = [...(d.certifications || [])];
      arr[certIdx] = { ...arr[certIdx], bullets: [...(arr[certIdx].bullets || []), { text: '', iconUrl: '/assets/portfolio/check.svg' }] };
      return { ...d, certifications: arr };
    });
  }

  function removeCertBullet(certIdx: number, bIdx: number) {
    setData((d) => {
      const arr = [...(d.certifications || [])];
      arr[certIdx] = { ...arr[certIdx], bullets: arr[certIdx].bullets.filter((_, i) => i !== bIdx) };
      return { ...d, certifications: arr };
    });
  }

  function setCertBullet(certIdx: number, bIdx: number, field: keyof Responsibility, value: string) {
    setData((d) => {
      const certs = [...(d.certifications || [])];
      const bullets = [...(certs[certIdx].bullets || [])];
      bullets[bIdx] = { ...bullets[bIdx], [field]: value };
      certs[certIdx] = { ...certs[certIdx], bullets };
      return { ...d, certifications: certs };
    });
  }

  function removeEdu(idx: number) {
    setData((d) => ({ ...d, education: d.education.filter((_, i) => i !== idx) }));
  }

  function setEdu(idx: number, field: keyof Education, value: string) {
    setData((d) => {
      const arr = [...d.education];
      arr[idx] = { ...arr[idx], [field]: value };
      return { ...d, education: arr };
    });
  }

  function addNonTechGroup() {
    setData((d) => ({ ...d, nonTechSkills: [...(d.nonTechSkills || []), { category: '', items: [] }] }));
  }

  function removeNonTechGroup(gi: number) {
    setData((d) => ({ ...d, nonTechSkills: (d.nonTechSkills || []).filter((_, i) => i !== gi) }));
  }

  function setNonTechCategory(gi: number, value: string) {
    setData((d) => {
      const arr = [...(d.nonTechSkills || [])];
      arr[gi] = { ...arr[gi], category: value };
      return { ...d, nonTechSkills: arr };
    });
  }

  function addNonTechItem(gi: number) {
    setData((d) => {
      const arr = [...(d.nonTechSkills || [])];
      arr[gi] = { ...arr[gi], items: [...arr[gi].items, ''] };
      return { ...d, nonTechSkills: arr };
    });
  }

  function removeNonTechItem(gi: number, ii: number) {
    setData((d) => {
      const arr = [...(d.nonTechSkills || [])];
      arr[gi] = { ...arr[gi], items: arr[gi].items.filter((_, i) => i !== ii) };
      return { ...d, nonTechSkills: arr };
    });
  }

  function setNonTechItem(gi: number, ii: number, value: string) {
    setData((d) => {
      const arr = [...(d.nonTechSkills || [])];
      const items = [...arr[gi].items];
      items[ii] = value;
      arr[gi] = { ...arr[gi], items };
      return { ...d, nonTechSkills: arr };
    });
  }

  function pickIcon(section: 'key' | 'other' | 'hobbies', idx: number, url: string) {
    setSkill(section, idx, 'iconUrl', url);
    setIconPickerTarget(null);
  }

  const pi = data.personalInfo;

  if (loading) return <div style={{ ...S.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;

  return (
    <>
      <Head><title>Resume — Admin</title></Head>
      <div style={S.page}>
        <header style={S.header}>
          <div style={S.logo}><span style={S.logoAccent}>T</span>AHIR Admin</div>
          <nav style={S.nav}>
            <button style={S.navBtn(false)} onClick={() => router.push('/admin/projects')}>Projects</button>
            <button style={S.navBtn(true)} onClick={() => router.push('/admin/resume')}>Resume</button>
            <button style={S.navBtn(false)} onClick={() => router.push('/admin/about')}>About</button>
            <button style={S.navBtn(false)} onClick={() => router.push('/admin/comments')}>Comments</button>
            <button style={S.navBtn(false)} onClick={() => router.push('/admin/articles')}>Articles</button>
            <button style={S.logoutBtn} onClick={handleLogout}>Sign Out</button>
          </nav>
        </header>

        <div style={S.content}>
          <h1 style={S.sectionTitle}>Resume</h1>
          <p style={S.sectionSub}>Edit every section of your resume. Changes are saved to the database and reflected immediately.</p>

          {data.experience.length === 0 && data.keyTechSkills.length === 0 && (
            <button style={S.seedBtn} onClick={handleSeed} disabled={seeding}>
              {seeding ? 'Seeding...' : 'Load Sample Resume Structure'}
            </button>
          )}

          {/* PERSONAL INFO */}
          <div style={S.card}>
            <div style={S.cardTitle}>Personal Info</div>
            <div style={S.grid2}>
              <div style={S.formRow}>
                <label style={S.label}>Full Name</label>
                <input style={S.input} value={pi.name} onChange={(e) => setPI('name', e.target.value)} placeholder="Tahir" />
              </div>
              <div style={S.formRow}>
                <label style={{ ...S.label, color: '#000000', WebkitTextFillColor: '#000000' }}>Suffix (e.g. PhD, MSc)</label>
                <input style={S.input} value={pi.suffix} autoComplete="off" onChange={(e) => setPI('suffix', e.target.value)} placeholder="Optional" />
              </div>
              <div style={S.formRow}>
                <label style={S.label}>Professional Title</label>
                <input style={S.input} value={pi.title} onChange={(e) => setPI('title', e.target.value)} placeholder="Full-Stack Developer" />
              </div>
              <div style={S.formRow}>
                <label style={S.label}>Location</label>
                <input style={S.input} value={pi.location} onChange={(e) => setPI('location', e.target.value)} placeholder="City, Country" />
              </div>
              <div style={S.formRow}>
                <label style={S.label}>Email</label>
                <input style={S.input} value={pi.email} onChange={(e) => setPI('email', e.target.value)} placeholder="you@email.com" />
              </div>
              <div style={S.formRow}>
                <label style={S.label}>Phone</label>
                <input style={S.input} value={pi.phone} onChange={(e) => setPI('phone', e.target.value)} placeholder="+1 123 456 7890" />
              </div>
              <div style={S.formRow}>
                <label style={S.label}>Website</label>
                <input style={S.input} value={pi.website} onChange={(e) => setPI('website', e.target.value)} placeholder="https://yoursite.com" />
              </div>
              <div style={S.formRow}>
                <label style={S.label}>LinkedIn URL</label>
                <input style={S.input} value={pi.linkedinUrl} onChange={(e) => setPI('linkedinUrl', e.target.value)} placeholder="https://linkedin.com/in/..." />
              </div>
              <div style={S.formRow}>
                <label style={S.label}>GitHub URL</label>
                <input style={S.input} value={pi.githubUrl} onChange={(e) => setPI('githubUrl', e.target.value)} placeholder="https://github.com/..." />
              </div>
              <div style={S.formRow}>
                <label style={S.label}>CV / Resume PDF URL</label>
                <input style={S.input} value={pi.cvPdfUrl} onChange={(e) => setPI('cvPdfUrl', e.target.value)} placeholder="/assets/your-cv.pdf or https://..." />
                <p style={S.hint}>Upload your PDF to the public/assets/ folder and enter the path here</p>
              </div>
            </div>
          </div>

          {/* SUMMARY */}
          <div style={S.card}>
            <div style={S.cardTitle}>Professional Summary</div>
            <textarea style={S.textarea} value={data.summary} onChange={(e) => setData((d) => ({ ...d, summary: e.target.value }))} placeholder="Write a compelling summary about yourself..." />
          </div>

          {/* KEY TECH SKILLS */}
          <div style={S.card}>
            <div style={S.cardTitle}>Key Technical Skills</div>
            <div style={S.skillList}>
              {data.keyTechSkills.map((skill, idx) => (
                <div key={idx}>
                  <div style={S.skillItem}>
                    {skill.iconUrl && <img src={skill.iconUrl} style={S.skillImg} alt={skill.text} onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.2'; }} />}
                    {!skill.iconUrl && <div style={{ width: 32, height: 32, background: '#252525', borderRadius: 4 }} />}
                    <input style={S.smallInput} value={skill.text} onChange={(e) => setSkill('key', idx, 'text', e.target.value)} placeholder="Skill name" />
                    <input style={{ ...S.smallInput, width: '130px' }} value={skill.iconUrl} onChange={(e) => setSkill('key', idx, 'iconUrl', e.target.value)} placeholder="/assets/..." />
                    <button
                      style={{ ...S.smallInput, cursor: 'pointer', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', background: '#1a1a1a', width: 'auto' } as React.CSSProperties}
                      onClick={() => { setIconPickerTarget(iconPickerTarget?.section === 'key' && iconPickerTarget.idx === idx ? null : { section: 'key' as const, idx }); }}
                    >
                      Browse...
                    </button>
                    <button style={S.removeBtn} onClick={() => removeSkill('key', idx)}>Remove</button>
                  </div>
                  {iconPickerTarget?.section === 'key' && iconPickerTarget.idx === idx && (
                    <div style={{ ...S.iconPickerWrap, marginTop: '4px', flexDirection: 'column', maxHeight: '300px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '8px', overflowY: 'auto' as const }}>
                        <div style={S.iconPickerItem(skill.iconUrl === '/assets/portfolio/skills/check.svg')} onClick={() => pickIcon('key', idx, '/assets/portfolio/skills/check.svg')}>
                          <span style={{ fontSize: '1rem' }}>✓</span> Bullet
                        </div>
                        {SKILL_ICONS.map((ic) => (
                          <div key={ic.url} style={S.iconPickerItem(skill.iconUrl === ic.url)} onClick={() => pickIcon('key', idx, ic.url)}>
                            <img src={ic.url} alt={ic.label} style={{ width: 20, height: 20, objectFit: 'contain' }} />
                            {ic.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button style={S.addRowBtn} onClick={() => addSkill('key')}>+ Add Skill</button>
          </div>

          {/* OTHER SKILLS */}
          <div style={S.card}>
            <div style={S.cardTitle}>Other Skills</div>
            <div style={S.skillList}>
              {data.otherSkills.map((skill, idx) => (
                <div key={idx}>
                  <div style={S.skillItem}>
                    {skill.iconUrl && <img src={skill.iconUrl} style={S.skillImg} alt={skill.text} onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.2'; }} />}
                    {!skill.iconUrl && <div style={{ width: 32, height: 32, background: '#252525', borderRadius: 4 }} />}
                    <input style={S.smallInput} value={skill.text} onChange={(e) => setSkill('other', idx, 'text', e.target.value)} placeholder="Skill name" />
                    <input style={{ ...S.smallInput, width: '130px' }} value={skill.iconUrl} onChange={(e) => setSkill('other', idx, 'iconUrl', e.target.value)} placeholder="/assets/..." />
                    <button
                      style={{ ...S.smallInput, cursor: 'pointer', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', background: '#1a1a1a', width: 'auto' } as React.CSSProperties}
                      onClick={() => { setIconPickerTarget(iconPickerTarget?.section === 'other' && iconPickerTarget.idx === idx ? null : { section: 'other' as const, idx }); }}
                    >
                      Browse...
                    </button>
                    <button style={S.removeBtn} onClick={() => removeSkill('other', idx)}>Remove</button>
                  </div>
                  {iconPickerTarget?.section === 'other' && iconPickerTarget.idx === idx && (
                    <div style={{ ...S.iconPickerWrap, marginTop: '4px', flexDirection: 'column', maxHeight: '300px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '8px', overflowY: 'auto' as const }}>
                        <div style={S.iconPickerItem(skill.iconUrl === '/assets/portfolio/skills/check.svg')} onClick={() => pickIcon('other', idx, '/assets/portfolio/skills/check.svg')}>
                          <span style={{ fontSize: '1rem' }}>✓</span> Bullet
                        </div>
                        {SKILL_ICONS.map((ic) => (
                          <div key={ic.url} style={S.iconPickerItem(skill.iconUrl === ic.url)} onClick={() => pickIcon('other', idx, ic.url)}>
                            <img src={ic.url} alt={ic.label} style={{ width: 20, height: 20, objectFit: 'contain' }} />
                            {ic.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button style={S.addRowBtn} onClick={() => addSkill('other')}>+ Add Skill</button>
          </div>

          {/* NON-TECHNICAL SKILLS */}
          <div style={S.card}>
            <div style={S.cardTitle}>Non-Technical Skills</div>
            <p style={{ ...S.hint, marginBottom: '12px' }}>Group skills into categories (e.g. Communication, Leadership). Displayed as tags on the resume.</p>
            {(data.nonTechSkills || []).map((group, gi) => (
              <div key={gi} style={{ ...S.expCard, marginBottom: '10px' }}>
                <div style={S.expHeader}>
                  <input
                    style={{ ...S.smallInput, flex: 1, fontWeight: 600 }}
                    value={group.category}
                    onChange={(e) => setNonTechCategory(gi, e.target.value)}
                    placeholder="Category name (e.g. Communication & Teamwork)"
                  />
                  <select
                    style={{ ...S.smallInput, width: '130px', marginLeft: '8px', padding: '4px 6px', fontSize: '0.75rem' }}
                    value={group.iconUrl || ''}
                    onChange={(e) => {
                      setData((d) => {
                        const arr = [...(d.nonTechSkills || [])];
                        arr[gi] = { ...arr[gi], iconUrl: e.target.value };
                        return { ...d, nonTechSkills: arr };
                      });
                    }}
                  >
                    <option value="">Default Bullet</option>
                    {BULLET_ICONS.map(b => (
                      <option key={b.url} value={b.url}>{b.label}</option>
                    ))}
                  </select>
                  <button style={{ ...S.removeBtn, marginLeft: '8px' }} onClick={() => removeNonTechGroup(gi)}>Remove Group</button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '6px', marginTop: '8px' }}>
                  {group.items.map((item, ii) => (
                    <div key={ii} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#111', borderRadius: '6px', padding: '4px 8px' }}>
                      <input
                        style={{ ...S.smallInput, width: '130px', padding: '4px 8px', fontSize: '0.75rem' }}
                        value={item}
                        onChange={(e) => setNonTechItem(gi, ii, e.target.value)}
                        placeholder="Skill name"
                      />
                      <button style={{ ...S.removeBtn, padding: '4px 8px', fontSize: '0.7rem' }} onClick={() => removeNonTechItem(gi, ii)}>×</button>
                    </div>
                  ))}
                  <button style={{ ...S.addRowBtn, padding: '5px 10px', fontSize: '0.75rem', marginTop: 0 }} onClick={() => addNonTechItem(gi)}>+ Skill</button>
                </div>
              </div>
            ))}
            <button style={S.addRowBtn} onClick={addNonTechGroup}>+ Add Category</button>
          </div>

          {/* HOBBIES & INTERESTS */}
          <div style={S.card}>
            <div style={S.cardTitle}>Hobbies & Interests</div>
            <p style={{ ...S.hint, marginBottom: '12px' }}>Displayed in the left sidebar below Non-Technical Skills. Use the bullet icon for a clean look, or pick any skill icon.</p>
            <div style={S.skillList}>
              {(data.hobbies || []).map((hobby, idx) => (
                <div key={idx}>
                  <div style={S.skillItem}>
                    {hobby.iconUrl && <img src={hobby.iconUrl} style={S.skillImg} alt={hobby.text} onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.2'; }} />}
                    {!hobby.iconUrl && <div style={{ width: 32, height: 32, background: '#252525', borderRadius: 4 }} />}
                    <input style={S.smallInput} value={hobby.text} onChange={(e) => setSkill('hobbies', idx, 'text', e.target.value)} placeholder="e.g. Playing Guitar 🎸" />
                    <input style={{ ...S.smallInput, width: '130px' }} value={hobby.iconUrl} onChange={(e) => setSkill('hobbies', idx, 'iconUrl', e.target.value)} placeholder="/assets/..." />
                    <button
                      style={{ ...S.smallInput, cursor: 'pointer', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', background: '#1a1a1a', width: 'auto' } as React.CSSProperties}
                      onClick={() => { setIconPickerTarget(iconPickerTarget?.section === 'hobbies' && iconPickerTarget.idx === idx ? null : { section: 'hobbies' as const, idx }); }}
                    >
                      Browse...
                    </button>
                    <button style={S.removeBtn} onClick={() => removeSkill('hobbies', idx)}>Remove</button>
                  </div>
                  {iconPickerTarget?.section === 'hobbies' && iconPickerTarget.idx === idx && (
                    <div style={{ ...S.iconPickerWrap, marginTop: '4px', flexDirection: 'column', maxHeight: '300px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '8px', overflowY: 'auto' as const }}>
                        <div style={S.iconPickerItem(hobby.iconUrl === '/assets/portfolio/bullets/check.svg')} onClick={() => pickIcon('hobbies', idx, '/assets/portfolio/bullets/check.svg')}>
                          <span style={{ fontSize: '1rem' }}>✓</span> Bullet
                        </div>
                        {BULLET_ICONS.map((ic) => (
                          <div key={ic.url} style={S.iconPickerItem(hobby.iconUrl === ic.url)} onClick={() => pickIcon('hobbies', idx, ic.url)}>
                            <img src={ic.url} alt={ic.label} style={{ width: 20, height: 20, objectFit: 'contain' }} />
                            {ic.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button style={S.addRowBtn} onClick={() => addSkill('hobbies')}>+ Add Hobby</button>
          </div>

          {/* EXPERIENCE */}
          <div style={S.card}>
            <div style={S.cardTitle}>Professional Experience</div>
            <div style={S.formRow}>
              <label style={S.label}>Experience Intro Text</label>
              <textarea
                style={{ ...S.input, minHeight: '64px', resize: 'vertical' as const }}
                value={data.experienceIntro}
                onChange={(e) => setData((d) => ({ ...d, experienceIntro: e.target.value }))}
                placeholder="I've worked on a handful of projects, some of which were for the following organizations:"
              />
              <p style={S.hint}>This sentence appears above the experience list on your resume.</p>
            </div>
            {data.experience.map((exp, expIdx) => (
              <div key={expIdx} style={S.expCard}>
                <div style={S.expHeader}>
                  <strong style={{ fontSize: '0.9rem' }}>{exp.company || `Experience ${expIdx + 1}`}</strong>
                  <button style={S.removeBtn} onClick={() => removeExp(expIdx)}>Remove</button>
                </div>
                <div style={S.grid2}>
                  <div style={S.formRow}>
                    <label style={S.label}>Company Name</label>
                    <input style={S.smallInput} value={exp.company} onChange={(e) => setExp(expIdx, 'company', e.target.value)} placeholder="Company" />
                  </div>
                  <div style={S.formRow}>
                    <label style={S.label}>Company Logo URL</label>
                    <input style={S.smallInput} value={exp.companyImg} onChange={(e) => setExp(expIdx, 'companyImg', e.target.value)} placeholder="/assets/portfolio/logo.png" />
                    <p style={S.hint}>Upload logo to public/assets/portfolio/ then enter path</p>
                  </div>
                  <div style={S.formRow}>
                    <label style={S.label}>Role / Position</label>
                    <input style={S.smallInput} value={exp.role} onChange={(e) => setExp(expIdx, 'role', e.target.value)} placeholder="Software Engineer" />
                  </div>
                  <div style={S.formRow}>
                    <label style={S.label}>Time Frame</label>
                    <input style={S.smallInput} value={exp.timeFrame} onChange={(e) => setExp(expIdx, 'timeFrame', e.target.value)} placeholder="2021 - Present" />
                  </div>
                </div>
                <div style={S.formRow}>
                  <label style={S.label}>Short Summary</label>
                  <textarea style={{ ...S.textarea, minHeight: '70px' }} value={exp.shortSummary} onChange={(e) => setExp(expIdx, 'shortSummary', e.target.value)} placeholder="Brief description of your role..." />
                </div>
                <div>
                  <label style={S.label}>Responsibilities / Achievements</label>
                  {(exp.responsibilities || []).map((resp, respIdx) => (
                    <div key={respIdx} style={S.respItem}>
                      <select
                        style={{ ...S.smallInput, padding: '4px 6px', fontSize: '0.7rem' }}
                        value={resp.iconUrl}
                        onChange={(e) => setResp(expIdx, respIdx, 'iconUrl', e.target.value)}
                      >
                        <option value="/assets/portfolio/check.svg">✓ Check</option>
                        <option value="/assets/portfolio/star.svg">★ Star</option>
                        <option value="/assets/portfolio/quote.svg">" Quote</option>
                      </select>
                      <input style={S.smallInput} value={resp.text} onChange={(e) => setResp(expIdx, respIdx, 'text', e.target.value)} placeholder="Responsibility or achievement" />
                      <input style={S.smallInput} value={resp.url || ''} onChange={(e) => setResp(expIdx, respIdx, 'url', e.target.value)} placeholder="Optional link URL" />
                      <button style={S.removeBtn} onClick={() => removeResp(expIdx, respIdx)}>×</button>
                    </div>
                  ))}
                  <button style={S.addRowBtn} onClick={() => addResp(expIdx)}>+ Add Responsibility</button>
                </div>
              </div>
            ))}
            <button style={S.addRowBtn} onClick={addExp}>+ Add Experience</button>
          </div>

          {/* EDUCATION */}
          <div style={S.card}>
            <div style={S.cardTitle}>Education</div>
            {data.education.map((edu, idx) => (
              <div key={idx} style={{ ...S.expCard, marginBottom: '10px' }}>
                <div style={S.expHeader}>
                  <strong style={{ fontSize: '0.85rem' }}>{edu.degree || `Education ${idx + 1}`}</strong>
                  <button style={S.removeBtn} onClick={() => removeEdu(idx)}>Remove</button>
                </div>
                <div style={S.grid2}>
                  <div style={S.formRow}>
                    <label style={S.label}>Degree</label>
                    <input style={S.smallInput} value={edu.degree} onChange={(e) => setEdu(idx, 'degree', e.target.value)} placeholder="Bachelor of Computer Science" />
                  </div>
                  <div style={S.formRow}>
                    <label style={S.label}>Field of Study</label>
                    <input style={S.smallInput} value={edu.field} onChange={(e) => setEdu(idx, 'field', e.target.value)} placeholder="Software Engineering" />
                  </div>
                  <div style={S.formRow}>
                    <label style={S.label}>Institution</label>
                    <input style={S.smallInput} value={edu.institution} onChange={(e) => setEdu(idx, 'institution', e.target.value)} placeholder="University Name" />
                  </div>
                  <div style={S.formRow}>
                    <label style={S.label}>Duration</label>
                    <input style={S.smallInput} value={edu.duration || ''} onChange={(e) => setEdu(idx, 'duration', e.target.value)} placeholder="2019 – 2023" />
                  </div>
                  <div style={S.formRow}>
                    <label style={S.label}>CGPA</label>
                    <input style={S.smallInput} value={edu.cgpa || ''} onChange={(e) => setEdu(idx, 'cgpa', e.target.value)} placeholder="8.5/10" />
                  </div>
                  <div style={S.formRow}>
                    <label style={S.label}>Percentage</label>
                    <input style={S.smallInput} value={edu.percentage || ''} onChange={(e) => setEdu(idx, 'percentage', e.target.value)} placeholder="78.5" />
                  </div>
                </div>
              </div>
            ))}
            <button style={S.addRowBtn} onClick={addEdu}>+ Add Education</button>
          </div>

          {/* CERTIFICATIONS */}
          <div style={S.card}>
            <div style={S.cardTitle}>Certifications</div>
            {(data.certifications || []).map((cert, idx) => (
              <div key={idx} style={{ ...S.expCard, marginBottom: '10px' }}>
                <div style={S.expHeader}>
                  <strong style={{ fontSize: '0.85rem' }}>{cert.certificationName || `Certification ${idx + 1}`}</strong>
                  <button style={S.removeBtn} onClick={() => removeCert(idx)}>Remove</button>
                </div>
                <div style={S.grid2}>
                  <div style={S.formRow}>
                    <label style={S.label}>Issuing Organization</label>
                    <input style={S.smallInput} value={cert.company} onChange={(e) => setCert(idx, 'company', e.target.value)} placeholder="Amazon Web Services" />
                  </div>
                  <div style={{ ...S.formRow, gridColumn: 'span 2' }}>
                    <label style={S.label}>Organization Logo URL (optional)</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {cert.companyImg && (
                        <img src={cert.companyImg} alt="logo" style={{ width: 32, height: 32, objectFit: 'contain', borderRadius: 4, background: '#fff', padding: 2, flexShrink: 0 }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      )}
                      <input style={{ ...S.input, flex: 1 }} value={cert.companyImg || ''} onChange={(e) => setCert(idx, 'companyImg', e.target.value)} placeholder="/assets/portfolio/skills/aws.svg or CDN URL" />
                    </div>
                    <p style={S.hint}>Upload logo to public/assets/portfolio/ then enter path, or use a CDN URL.</p>
                  </div>
                  <div style={S.formRow}>
                    <label style={S.label}>Certification Name</label>
                    <input style={S.smallInput} value={cert.certificationName} onChange={(e) => setCert(idx, 'certificationName', e.target.value)} placeholder="AWS Certified Solutions Architect" />
                  </div>
                  <div style={S.formRow}>
                    <label style={S.label}>Time Frame</label>
                    <input style={S.smallInput} value={cert.timeFrame} onChange={(e) => setCert(idx, 'timeFrame', e.target.value)} placeholder="Jan 2024" />
                  </div>
                  <div style={S.formRow}>
                    <label style={S.label}>Credential URL (optional)</label>
                    <input style={S.smallInput} value={cert.url || ''} onChange={(e) => setCert(idx, 'url', e.target.value)} placeholder="https://www.credly.com/badges/..." />
                  </div>
                  <div style={{ ...S.formRow, gridColumn: 'span 2' }}>
                    <label style={S.label}>Description</label>
                    <textarea style={S.textarea} value={cert.description} onChange={(e) => setCert(idx, 'description', e.target.value)} placeholder="Brief description of the certification..." rows={2} />
                  </div>
                </div>
                <div style={{ marginTop: '8px' }}>
                  <label style={{ ...S.label, marginBottom: '4px', display: 'block' }}>Bullet Points</label>
                  {(cert.bullets || []).map((b, bIdx) => (
                    <div key={bIdx} style={{ marginBottom: '8px' }}>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        {b.iconUrl && (
                          b.iconUrl === '/assets/portfolio/skills/check.svg'
                            ? <span style={{ fontSize: '1.1rem', width: 24, textAlign: 'center' }}>✓</span>
                            : <img src={b.iconUrl} style={{ width: 22, height: 22, objectFit: 'contain' }} alt="" onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.2'; }} />
                        )}
                        <input style={{ ...S.smallInput, flex: 1 }} value={b.text} onChange={(e) => setCertBullet(idx, bIdx, 'text', e.target.value)} placeholder="Bullet point text" />
                        <button
                          style={{ ...S.smallInput, width: '120px', cursor: 'pointer', background: '#1a1a1a', whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis' } as React.CSSProperties}
                          onClick={() => { const same = certBulletPicker?.certIdx === idx && certBulletPicker.bIdx === bIdx; setCertBulletPicker(same ? null : { certIdx: idx, bIdx }); setCertBulletSearch(''); }}
                        >
                          {b.iconUrl ? b.iconUrl.split('/').pop() : 'Pick icon...'}
                        </button>
                        <input style={{ ...S.smallInput, width: '160px' }} value={b.url || ''} onChange={(e) => setCertBullet(idx, bIdx, 'url', e.target.value)} placeholder="Link URL (optional)" />
                        <button style={S.removeBtn} onClick={() => removeCertBullet(idx, bIdx)}>✕</button>
                      </div>
                      {certBulletPicker?.certIdx === idx && certBulletPicker.bIdx === bIdx && (
                        <div style={{ ...S.iconPickerWrap, marginTop: '4px', flexDirection: 'column', maxHeight: '260px' }}>
                          <input style={{ ...S.smallInput, marginBottom: '8px', flexShrink: 0 }} value={certBulletSearch} onChange={(e) => setCertBulletSearch(e.target.value)} placeholder="Search icons..." autoFocus />
                          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '8px', overflowY: 'auto' as const }}>
                            <div style={S.iconPickerItem(b.iconUrl === '/assets/portfolio/bullets/check.svg')} onClick={() => { setCertBullet(idx, bIdx, 'iconUrl', '/assets/portfolio/bullets/check.svg'); setCertBulletPicker(null); }}>
                              <span style={{ fontSize: '1rem' }}>✓</span> Bullet
                            </div>
                            {BULLET_ICONS.filter((ic) => ic.label.toLowerCase().includes(certBulletSearch.toLowerCase())).map((ic) => (
                              <div key={ic.url} style={S.iconPickerItem(b.iconUrl === ic.url)} onClick={() => { setCertBullet(idx, bIdx, 'iconUrl', ic.url); setCertBulletPicker(null); }}>
                                <img src={ic.url} alt={ic.label} style={{ width: 20, height: 20, objectFit: 'contain' }} />
                                {ic.label}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  <button style={S.addRowBtn} onClick={() => addCertBullet(idx)}>+ Add Bullet</button>
                </div>
              </div>
            ))}
            <button style={S.addRowBtn} onClick={addCert}>+ Add Certification</button>
          </div>

          <div style={{ height: '80px' }} />
        </div>

        <div style={S.saveBar}>
          <button style={S.saveBtn} onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
          {status && <span style={{ ...S.status, color: status.includes('success') ? '#2bff88' : '#ff4d4d' }}>{status}</span>}
        </div>
      </div>
    </>
  );
}
