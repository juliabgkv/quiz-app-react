import { List, ListItemText, Typography, Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

function RightAnswers({ questions, userAnswers }) {
  return (
    <List>
      {questions.map((question, index) => {
        const isCorrectAnswer =
          userAnswers[index] === questions[index].answers[0];

        return (
          <ListItemText key={question.question} sx={{ mb: 2 }}>
            <Typography
              variant="subtitle1"
              dangerouslySetInnerHTML={{
                __html: `${index + 1}. ${question.question}`,
              }}
            ></Typography>
            {userAnswers[index] && (
              <Typography
                component="div"
                variant="subtitle1"
                color={isCorrectAnswer ? "primary" : "error"}
                sx={{ display: "inline-flex", alignItems: "center" }}
              >
                {isCorrectAnswer ? (
                  <CheckIcon sx={{ verticalAlign: "middle", mr: "5px" }} />
                ) : (
                  <ClearIcon sx={{ verticalAlign: "middle", mr: "5px" }} />
                )}
                <Box
                  component="span"
                  dangerouslySetInnerHTML={{
                    __html: userAnswers[index],
                  }}
                ></Box>
              </Typography>
            )}
            {!userAnswers[index] && (
              <Typography variant="subtitle1" component="div" color="grey">
                Skipped
              </Typography>
            )}
            {!isCorrectAnswer && (
              <Typography
                variant="subtitle1"
                dangerouslySetInnerHTML={{
                  __html: questions[index].answers[0],
                }}
              ></Typography>
            )}
          </ListItemText>
        );
      })}
    </List>
  );
}

export default RightAnswers;
