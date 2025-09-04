This is a guideline you must follow when working in the sos_grandbazaar project.

Front-end code development:
- Use Tailwind CSS for styling.
- Use Shadcn UI for components. Assume all necessary components are available, ignore the warning about the missing components.
- The project must be written in React for responsive design.
- For any icons, when necessary, use lucide-react.
- Use Jotai for state management.

Code Standards:
- Ensure to componentize files and to separate functions by responsability.
- Act as to prevent code repetition and maintain code DRY. If you find opportunity to optimize, do it.

Theme and Color Scheme:
- The @index.css file must define the theme and color scheme according to the Shadcn UI guidelines.
- The CSS is already in Tailwind V4 correct format.
- Always lean towards stunning beauty and elegance, prioritizing the "WoW Factor" of the layouts.

JSON Data:
- Store any JSON containing data to be displayed in the frontend in the @/data folder.

Routing and Sidebar:
- Every page must be in the @/components/layout/AppLayout.tsx file and @/App.tsx file.

Pages:
- A page must use the entire width available, without any other components taking up space.
- Prefer vertical navigation, avoiding multiple horizontal columns.
- Add search and ordering functionality when applicable.
- Consider carefully the usability and experience of the page, knowing all content is for consultation by players that are currently playing.
- Prioritize good design for mobile devices, considering all components must be responsive and suited to navigation by touch.