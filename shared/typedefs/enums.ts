export enum EDateFormat {
  LONG = "MMMM DD, YYYY",
  SHORT = "MMM DD, YYYY",
  SHORT_WITH_TIME = "MMM DD, YYYY, h:mm a",
  LONG_WITH_TIME = "MMMM DD, YYYY, h:mm a",
}

export enum EGender {
  MALE = "Male",
  FEMALE = "Female",
}

export enum EEducationLevel {
  SCHOOL = "School",
  COLLEGE = "College",
  UNIVERSITY = "University",
}

export enum EMedium {
  BANGLA = "Bangla",
  ENGLISH = "English",
}

export enum EDegree {
  BACHELORS = "Bachelors",
  MASTERS = "Masters",
}

export enum ERole {
  STUDENT = "Student",
  TEACHER = "Teacher",
}

export enum EHighestEducationLevel {
  BACHELORS = "Bachelors",
  MASTERS = "Masters",
  DIPLOMA = "Diploma",
  PHD = "PhD",
}

export enum EGatewayOutgoingEvent {
  JOIN_CLASSROOM = "JOIN_CLASSROOM",
  SEND_MESSAGE = "SEND_MESSAGE",
}

export enum EGatewayIncomingEvent {
  RECEIVE_MESSAGE = "RECEIVE_MESSAGE",
}
