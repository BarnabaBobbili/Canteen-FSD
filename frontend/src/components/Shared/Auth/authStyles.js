/**
 * Authentication Form Style Variants
 * Provides different styling themes for auth forms
 */

export const authStyles = {
  default: {
    container: "min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100 flex items-center justify-center p-6",
    bgPattern: "absolute inset-0 opacity-10",
    blob1: "absolute top-20 left-10 w-72 h-72 bg-sky-500 rounded-full blur-3xl",
    blob2: "absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl",
    leftCard: "bg-gradient-to-br from-sky-400 to-blue-500 rounded-3xl p-12 shadow-2xl",
    leftInner: "bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20",
    rightCard: "bg-white rounded-3xl shadow-2xl p-8 lg:p-12 max-h-[90vh] overflow-y-auto",
    input: "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent",
    button: "w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-400 to-blue-500 text-white py-3 rounded-lg hover:shadow-lg transition-all transform hover:scale-105 font-semibold",
    divider: "flex-1 border-t border-gray-300",
    link: "text-sky-600 hover:text-sky-700 font-medium"
  },
  sketch: {
    container: 'min-h-screen bg-white relative flex items-center justify-center p-6',
    bgPattern: `backgroundImage: url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23fafafa'/%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%23e5e5e5' stroke-width='0.5'/%3E%3C/svg%3E")`,
    leftCard: "bg-gray-900 border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.4)] p-12 transform rotate-2",
    leftInner: "bg-white border-3 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] p-8 transform -rotate-1",
    rightCard: "bg-white border-4 border-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.4)] p-8 lg:p-12 max-h-[90vh] overflow-y-auto transform -rotate-1",
    input: "w-full pl-10 pr-4 py-3 border-3 border-gray-900 focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] font-medium transform focus:-rotate-1 transition-all",
    button: "w-full flex items-center justify-center gap-2 bg-gray-900 border-4 border-gray-900 text-white py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transition-all transform hover:scale-105 hover:rotate-1 font-black",
    divider: "flex-1 border-t-2 border-dashed border-gray-400",
    link: "text-gray-900 hover:text-gray-600 font-black underline decoration-wavy decoration-2 underline-offset-2"
  }
};

/**
 * Get inline styles for sketch variant background
 * @param {string} variant - Style variant ('default' or 'sketch')
 * @returns {Object} Inline style object
 */
export const getBackgroundStyle = (variant) => {
  if (variant === 'sketch') {
    return {
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23fafafa'/%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%23e5e5e5' stroke-width='0.5'/%3E%3C/svg%3E")`,
      fontFamily: '"Comic Sans MS", "Marker Felt", cursive'
    };
  }
  return {};
};
