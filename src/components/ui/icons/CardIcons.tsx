import { ReactNode } from "react";

import { motion } from "framer-motion";

export type HeartIconProps = {
  children: ReactNode;
  percentage: number;
  id: string;
  stroke?: string;
  size?: number;
};

export type PowerIconProps = {
  id: string;
  used: number;
  stroke?: string;
  size?: number;
};

export type BasicIconProps = {
  stroke?: string;
  size?: number;
  style?: boolean;
};

export function SwordIcon({ id, used, stroke, size }: PowerIconProps) {
  return (
    <svg
      viewBox="0 0 510.31 510.3"
      className="w-full"
      style={{ width: size, height: size }}
    >
      <linearGradient id={`swordgradient${id}`} gradientTransform="rotate(90)">
        <stop offset={`${used}%`} stopColor="white" stopOpacity=".5" />
        <stop offset={`${used}%`} stopColor="blue" />
      </linearGradient>

      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        fill={`url('#swordgradient${id}')`}
        stroke={stroke || "white"}
        strokeWidth={10}
        transition={{
          duration: 1,
          type: "tween",
          ease: "easeOut",
          delay: 0.5,
        }}
        d="M504.06,443.728c-8.341-8.341-21.845-8.341-30.165,0h-0.021L412.946,382.8c20.096-23.915,34.731-50.389,36.928-72.768
          c1.131-11.733-7.424-22.165-19.157-23.317c-11.925-1.195-22.165,7.445-23.317,19.157c-0.256,2.773-1.067,5.803-2.091,8.917
          l-59.648-59.627l128.235-128.235c2.325-2.347,4.096-5.205,5.141-8.341l30.165-90.496c2.56-7.68,0.555-16.128-5.141-21.845
          c-5.717-5.717-14.187-7.701-21.845-5.141L391.719,31.27c-3.136,1.045-5.995,2.816-8.341,5.163L255.143,164.646L126.93,36.432
          c-2.325-2.347-5.184-4.117-8.341-5.163L28.092,1.104c-7.616-2.56-16.128-0.597-21.824,5.141
          c-5.717,5.717-7.723,14.165-5.163,21.845l30.165,90.496c1.045,3.136,2.816,5.995,5.163,8.341l128.213,128.213l-59.904,59.925
          c-0.917-2.965-1.621-5.824-1.771-8.405c-0.704-11.755-10.88-20.693-22.592-20.011c-11.776,0.725-20.693,10.837-19.989,22.592
          c1.344,22.251,16.149,49.237,36.864,73.643l-60.821,60.843c-8.341-8.341-21.845-8.341-30.165,0c-8.341,8.32-8.341,21.824,0,30.165
          l30.165,30.165c4.16,4.16,9.621,6.251,15.083,6.251s10.901-2.091,15.083-6.251c8.32-8.341,8.32-21.845,0-30.165l60.907-60.928
          c23.915,20.096,50.411,34.709,72.789,36.885c0.725,0.085,1.408,0.107,2.091,0.107c10.859,0,20.139-8.235,21.205-19.264
          c1.152-11.712-7.445-22.165-19.157-23.296c-2.773-0.277-5.803-1.067-8.917-2.112l59.648-59.627l59.904,59.904
          c-2.965,0.917-5.824,1.621-8.405,1.771c-11.776,0.704-20.715,10.816-20.011,22.592c0.683,11.307,10.091,20.032,21.269,20.032
          c0.448,0,0.875,0,1.323-0.043c22.251-1.344,49.216-16.149,73.621-36.864l60.843,60.843c-8.32,8.32-8.32,21.824,0,30.165
          c4.181,4.16,9.643,6.251,15.104,6.251c5.44,0,10.901-2.091,15.083-6.251l30.165-30.165
          C512.38,465.552,512.38,452.048,504.06,443.728z M157.927,382.544c-5.653-4.587-11.2-9.557-16.448-14.784
          c-0.149-0.149-0.299-0.32-0.448-0.469c-4.715-4.736-9.237-9.728-13.419-14.784l67.2-67.179l30.187,30.165L157.927,382.544z
           M298.194,207.696l-12.864-12.885L409.98,70.16l45.269-15.083l-15.104,45.248L315.495,224.998L298.194,207.696z"
      />
    </svg>
  );
}

export function SpecialPowerIcon({ id, used, stroke, size }: PowerIconProps) {
  return (
    <svg
      viewBox="0 -0.5 17 17"
      className="w-full"
      style={{ width: size, height: size }}
    >
      <linearGradient id={`spicongradient${id}`} gradientTransform="rotate(90)">
        <stop offset={`${used}%`} stopColor="white" stopOpacity=".5" />
        <stop offset={`${used}%`} stopColor="#32CD32" />
      </linearGradient>

      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        fill={`url('#spicongradient${id}')`}
        stroke={stroke || "white"}
        strokeWidth={0.5}
        transition={{
          duration: 1,
          type: "tween",
          ease: "easeOut",
          delay: 0.5,
        }}
        d="M14.289,0.023 L6.925,0 L2.984,8 L8,8 L3.666,15.916 L14.924,4.941 L10.35,4.941 L14.289,0.023"
      />
    </svg>
  );
}

export function HeartIcon({
  children,
  percentage,
  id,
  stroke,
}: HeartIconProps) {
  return (
    <div className="relative flex items-center w-fit h-fit">
      <svg viewBox="0 0 24 24" className="w-full aspect-square">
        <linearGradient id={`gradient${id}`} gradientTransform="rotate(90)">
          <stop offset={`${percentage}%`} stopColor="white" stopOpacity=".5" />
          <stop offset={`${percentage}%`} stopColor="red" />
        </linearGradient>

        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          fill={`url('#gradient${id}')`}
          stroke={stroke || "white"}
          strokeWidth={0.6}
          transition={{
            duration: 1,
            type: "tween",
            ease: "easeOut",
            delay: 0.5,
          }}
          d="M14 20.408c-.492.308-.903.546-1.192.709-.153.086-.308.17-.463.252h-.002a.75.75 0 01-.686 0 16.709 16.709 0 01-.465-.252 31.147 31.147 0 01-4.803-3.34C3.8 15.572 1 12.331 1 8.513 1 5.052 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262A31.146 31.146 0 0114 20.408z"
        />
      </svg>
      {children}
    </div>
  );
}

export function ExplosionIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-full w-full">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        strokeWidth={0.5}
        fill="red"
        transition={{
          duration: 1,
          type: "tween",
          ease: "easeOut",
          delay: 0.5,
        }}
        d="M30.79 20.247v-1.813c-3.349-1.335-5.321-2.581-5.928-4.568-0.498-1.631 1.004-3.801 3.836-6.416-2.958 1.621-5.135 2.722-5.997 1.185-0.774-1.38 0.093-3.966 1.464-7.357h-0.976c-1.094 1.731-2.025 3.044-2.371 2.72-0.301-0.283-0.305-1.301-0.174-2.72l-2.022-0.001c-1.338 2.997-2.757 4.695-4.812 4.986-1.756 0.249-4.029-1.814-6.59-4.742 1.458 2.894 1.994 5.215 1.011 5.788-1.162 0.678-3.491-0.121-6.939-1.569v0.662c2.372 1.506 4.557 2.975 4.149 3.522-0.358 0.48-1.992 0.397-4.149 0.105v1.709c3.121 1.576 4.812 3.193 4.812 4.707 0 1.302-2.601 3.961-4.812 6.067v1.011c1.995-0.654 4.443-0.908 5.265 0.558 0.839 1.495 0.276 3.611-0.802 6.695h1.848c1.958-2.645 3.819-4.766 4.812-4.672 0.703 0.066 0.375 2.225-0.105 4.672h0.558c1.743-4.845 3.892-7.814 7.078-7.706 2.796 0.096 5.449 2.91 8.368 4.916-1.526-1.867-4.337-4.526-3.731-5.021 0.637-0.521 3.367 0.432 6.207 1.464v-0.907c-1.863-1.271-3.576-2.492-3.138-2.929 0.394-0.393 1.596-0.456 3.138-0.349zM21.948 18.081c-0.335 0.334 1.759 1.577 2.956 2.438-1.81-0.632-4.092-1.582-4.518-1.234-0.308 0.252 1.12 1.603 1.897 2.553-1.485-1.021-2.845-2.448-4.267-2.496-2.092-0.071-3.29 2.442-4.323 6.282 0.272-1.823 1.089-4.679 0.502-4.733-0.833-0.078-2.846 2.892-4.351 5.106 1.051-3.185 2.006-5 1.367-6.139-0.577-1.029-2.744-0.403-3.682 0.143 1.105-1.043 3.447-3.141 3.447-4.025 0-1.286-2.32-2.733-6.599-3.951 2.572 0.405 5.888 1.149 6.275 0.631 0.303-0.405-2.192-1.813-3.71-2.811 2.672 1.146 4.365 1.92 5.122 1.479 0.5-0.292 0.222-1.47-0.52-2.942 1.303 1.489 2.471 2.538 3.364 2.411 1.884-0.267 2.698-2.76 4.166-7.518l0 0c-0.345 2.648-1.044 5.965-0.614 6.369 0.322 0.303 1.636-2.144 2.65-3.701-1.144 2.886-2.245 5.056-1.69 6.045 0.439 0.782 1.552 0.23 3.056-0.594-1.44 1.33-2.214 2.433-1.961 3.263 0.503 1.647 2.857 2.292 7.065 3.766-2.161-0.28-5.135-0.842-5.634-0.344z"
      />
    </svg>
  );
}
