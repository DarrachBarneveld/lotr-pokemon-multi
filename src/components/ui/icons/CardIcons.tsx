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
      viewBox="0 0 260 260"
      className="w-full h-full"
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
        d="M258,2l-16,48L97.06,181.76l-7.23-11.14l-11.68-7.58L210,18L258,2z M101.029,238.26l11.314-11.314l-31.176-48.02
        l-48.02-31.176l-11.314,11.314l31.386,31.386l-34.26,37.693c-4.464-0.586-9.138,0.82-12.568,4.249
        c-5.858,5.858-5.858,15.355,0,21.213c5.858,5.858,15.355,5.858,21.213,0c3.428-3.428,4.834-8.1,4.25-12.562l37.695-34.262
        L101.029,238.26z"
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
    <div className="relative">
      <svg viewBox="0 0 24 24" className="h-full w-full aspect-square">
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

export function ShieldIcon() {
  return (
    <svg viewBox="0 0 512 512" className="h-full w-full">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        strokeWidth={6}
        stroke="black"
        fill="gold"
        transition={{
          duration: 1,
          type: "tween",
          ease: "easeOut",
          delay: 0.5,
        }}
        d="m343.2,266.7l-66.7,.4 .4,67.1c0.1,11.3-9,20.6-20.3,20.6 0,0-0.1,0-0.1,0-11.2,0-20.4-9.1-20.4-20.4l-.4-67.1-66.7,.4c0,0-0.1,0-0.1,0-11.2,0-20.4-9.1-20.4-20.4-0.1-11.3 9-20.6 20.3-20.6l66.7-.4-.4-67.1c-0.1-11.3 9-20.6 20.3-20.6 0,0 0.1,0 0.1,0 11.2,0 20.4,9.1 20.4,20.4l.4,67.1 66.7-.4c11.4-0.3 20.5,9.1 20.5,20.4 0.1,11.3-9,20.5-20.3,20.6zm157.5-236.1c-0.4-8-5.3-15-12.7-18.1-7.4-3-15.8-1.4-21.6,4-36,33.9-72.2,49.7-107.4,47.5-51.7-3.4-86.3-45.1-86.6-45.4-3.9-4.8-9.7-7.6-15.8-7.6-6.1,0-11.9,2.8-15.8,7.5-0.3,0.4-34.8,42-87.2,45.5-35.7,2.3-71.9-13.6-107.8-47.5-5.8-5.5-14.3-7-21.7-4-7.4,3-12.3,10.1-12.7,18.1-0.8,14.7-12.8,361.5 237,468.8 2.6,1.1 5.3,1.6 8,1.6 2.7,0 5.5-0.6 8-1.6 250-107.4 237-454.1 236.3-468.8v-2.13163e-14z"
      />
    </svg>
  );
}
