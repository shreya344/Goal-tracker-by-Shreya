import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdOutlineDoNotDisturb } from "react-icons/md";
import { Goal } from "./Goal";
import { Button } from "../UI/Button";
import ProgressBar from "../UI/ProgressBar";
import { useGoalProgress } from "../../hooks/useGoalProgress";
import { useScreenWidth } from "../../hooks/useScreenWidth";

export function GoalList({
  goals,
  onCheck,
  isDarkMode,
  updatedThemeForElement,
  progress,
  setProgress,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  let goalsPerPage = 4;

  const screenWidth = useScreenWidth();

  const totalPages = Math.ceil(goals.length / goalsPerPage);
  const startIndex = (currentPage - 1) * goalsPerPage;
  const endIndex = startIndex + goalsPerPage;
  const currentGoals = goals.slice(startIndex, endIndex);

  useEffect(() => {
    if (currentGoals.length === 0 && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }

    updatedThemeForElement(".goal", isDarkMode ? "dark" : "light");
    updatedThemeForElement(".goal p", isDarkMode ? "dark" : "light");
    updatedThemeForElement(".goal span", isDarkMode ? "dark" : "light");
  }, [goals, currentPage, currentGoals, isDarkMode, updatedThemeForElement]);

  useGoalProgress(goals, setProgress);

  function handlePrevPage() {
    setCurrentPage((prevPage) => prevPage - 1);
  }

  function handleNextPage() {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  return (
    <>
      <div className="down-layer">
        <motion.ul className="goalList" key={currentPage}>
          <AnimatePresence>
            {currentGoals.length > 0 ? (
              currentGoals.map((goal) => (
                <Goal goal={goal} key={goal.id} onCheck={onCheck} />
              ))
            ) : (
              <motion.p
                className="goalList__text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <MdOutlineDoNotDisturb />
                No goals found
              </motion.p>
            )}
          </AnimatePresence>
        </motion.ul>

        {goals.length > goalsPerPage && (
          <div className="pagination">
            {currentPage > 1 && (
              <Button onClick={handlePrevPage} className="pagination-btn">
                ←
              </Button>
            )}
            <span>
              {currentPage} / {totalPages}
            </span>
            {currentPage < totalPages && (
              <Button onClick={handleNextPage} className="pagination-btn">
                →
              </Button>
            )}
          </div>
        )}
      </div>
      {screenWidth < 550 && <ProgressBar progress={progress} />}
    </>
  );
}
