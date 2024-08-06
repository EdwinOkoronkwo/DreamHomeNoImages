DELIMITER $$

CREATE PROCEDURE STAFF_HIRE_SP(
    IN P_STAFFNO VARCHAR(50),
    IN P_FNAME VARCHAR(50),
    IN P_LNAME VARCHAR(50),
    IN P_POSITION VARCHAR(50),
    IN P_SEX VARCHAR(10),
    IN P_DOB DATE,
    IN P_SALARY DECIMAL(10, 2),
    IN P_BRANCHNO VARCHAR(50),
    IN P_TELEPHONE VARCHAR(15),
    IN P_MOBILE VARCHAR(15),
    IN P_EMAIL VARCHAR(50),
    OUT P_RESULT VARCHAR(255)
)
BEGIN
    DECLARE
        V_BRANCHCOUNT INT;
        DECLARE       V_STAFFCOUNT INT;
        SELECT        COUNT(*) INTO V_BRANCHCOUNT FROM DH_BRANCH WHERE BRANCHNO = P_BRANCHNO;
        IF            V_BRANCHCOUNT != 0 THEN
            SELECT
                COUNT(*) INTO V_STAFFCOUNT
            FROM
                DH_STAFF
            WHERE
                STAFFNO = P_STAFFNO;
            IF            V_STAFFCOUNT = 0 THEN
                INSERT INTO DH_STAFF (
                    STAFFNO,
                    FNAME,
                    LNAME,
                    POSITION,
                    SEX,
                    DOB,
                    SALARY,
                    BRANCHNO,
                    TELEPHONE,
                    MOBILE,
                    EMAIL
                ) VALUES (
                    P_STAFFNO,
                    P_FNAME,
                    P_LNAME,
                    P_POSITION,
                    P_SEX,
                    P_DOB,
                    P_SALARY,
                    P_BRANCHNO,
                    P_TELEPHONE,
                    P_MOBILE,
                    P_EMAIL
                );
                SET           P_RESULT = 'Employee hired successfully.';
                ELSE          SET P_RESULT = 'The staff number entered already exists.';
            END IF;
            ELSE          SET P_RESULT = 'The branch number entered is not valid.';
        END IF;
    END $$ CREATE PROCEDURE UPDATE_STAFF_SP( IN P_STAFFNO VARCHAR(50), IN P_NEW_SALARY DECIMAL(10, 2), IN P_NEW_TELEPHONE VARCHAR(15), IN P_NEW_MOBILE VARCHAR(15), IN P_NEW_EMAIL VARCHAR(50), OUT P_RESULT VARCHAR(255) ) BEGIN DECLARE V_STAFFCOUNT INT;
    IF P_NEW_SALARY IS NULL THEN
        SET P_NEW_SALARY = (
            SELECT
                SALARY
            FROM
                DH_STAFF
            WHERE
                STAFFNO = P_STAFFNO
        );
    END IF;

    IF P_NEW_TELEPHONE IS NULL THEN
        SET P_NEW_TELEPHONE = (
            SELECT
                TELEPHONE
            FROM
                DH_STAFF
            WHERE
                STAFFNO = P_STAFFNO
        );
    END IF;

    IF P_NEW_MOBILE IS NULL THEN
        SET P_NEW_MOBILE = (
            SELECT
                MOBILE
            FROM
                DH_STAFF
            WHERE
                STAFFNO = P_STAFFNO
        );
    END IF;

    IF P_NEW_EMAIL IS NULL THEN
        SET P_NEW_EMAIL = (
            SELECT
                EMAIL
            FROM
                DH_STAFF
            WHERE
                STAFFNO = P_STAFFNO
        );
    END IF;

    SELECT
        COUNT(*) INTO V_STAFFCOUNT
    FROM
        DH_STAFF
    WHERE
        STAFFNO = P_STAFFNO;
    IF V_STAFFCOUNT != 0 THEN
        UPDATE DH_STAFF
        SET
            SALARY = P_NEW_SALARY,
            TELEPHONE = P_NEW_TELEPHONE,
            MOBILE = P_NEW_MOBILE,
            EMAIL = P_NEW_EMAIL
        WHERE
            STAFFNO = P_STAFFNO;
        SET P_RESULT = 'Information updated successfully';
    ELSE
        SET P_RESULT = 'The staff number entered does not exist';
    END IF;
END $$ CREATE FUNCTION GET_BRANCH_ADDRESS_FN( P_BRANCHNO VARCHAR(50) ) RETURNS VARCHAR(255) BEGIN DECLARE REC_BRANCH_STREET VARCHAR(255);
DECLARE
    REC_BRANCH_CITY VARCHAR(255);
    DECLARE         REC_BRANCH_POSTCODE VARCHAR(50);
    DECLARE         V_RESULT VARCHAR(255);
    SELECT          STREET, CITY, POSTCODE INTO REC_BRANCH_STREET, REC_BRANCH_CITY, REC_BRANCH_POSTCODE FROM DH_BRANCH WHERE BRANCHNO = P_BRANCHNO;
    IF              (REC_BRANCH_STREET IS NOT NULL
    AND REC_BRANCH_CITY IS NOT NULL
    AND REC_BRANCH_POSTCODE IS NOT NULL) THEN
        SET V_RESULT = CONCAT('Street: ', REC_BRANCH_STREET, '\nCity: ', REC_BRANCH_CITY, '\nPostal Code: ', REC_BRANCH_POSTCODE);
        ELSE            SET V_RESULT = 'The branch number entered does not exist.';
    END IF;
    RETURN          V_RESULT;
END $$ CREATE PROCEDURE UPDATE_BRANCH_DETAILS_SP( IN P_BRANCHNO VARCHAR(50), IN P_STREET VARCHAR(255), IN P_CITY VARCHAR(255), IN P_POSTCODE VARCHAR(50), OUT P_RESULT VARCHAR(255) ) BEGIN DECLARE V_BRANCHCOUNT INT;
IF              P_STREET IS
    NULL THEN
        SET P_STREET = (
            SELECT
                STREET
            FROM
                DH_BRANCH
            WHERE
                BRANCHNO = P_BRANCHNO
        );
END IF;
IF              P_CITY IS
    NULL THEN
        SET P_CITY = (
            SELECT
                CITY
            FROM
                DH_BRANCH
            WHERE
                BRANCHNO = P_BRANCHNO
        );
END IF;
IF              P_POSTCODE IS
    NULL THEN
        SET P_POSTCODE = (
            SELECT
                POSTCODE
            FROM
                DH_BRANCH
            WHERE
                BRANCHNO = P_BRANCHNO
        );
END IF;
SELECT          COUNT(*) INTO V_BRANCHCOUNT FROM DH_BRANCH WHERE BRANCHNO = P_BRANCHNO;
IF              V_BRANCHCOUNT != 0 THEN
    UPDATE DH_BRANCH SET STREET = P_STREET, CITY = P_CITY, POSTCODE = P_POSTCODE WHERE BRANCHNO = P_BRANCHNO;
    SET             P_RESULT = 'Information updated successfully!';
    ELSE            SET P_RESULT = 'The branch number entered does not exist.';
END IF;
END $$ CREATE PROCEDURE NEW_BRANCH_SP( IN P_BRANCHNO VARCHAR(50), IN P_STREET VARCHAR(255), IN P_CITY VARCHAR(255), IN P_POSTCODE VARCHAR(50), OUT P_RESULT VARCHAR(255) ) BEGIN DECLARE V_BRANCHCOUNT INT;
SELECT          COUNT(*) INTO V_BRANCHCOUNT FROM DH_BRANCH WHERE BRANCHNO = P_BRANCHNO;
IF              V_BRANCHCOUNT = 0 THEN
    INSERT INTO DH_BRANCH (
        BRANCHNO,
        STREET,
        CITY,
        POSTCODE
    ) VALUES (
        P_BRANCHNO,
        P_STREET,
        P_CITY,
        P_POSTCODE
    );
    SET             P_RESULT = 'New branch created successfully.';
    ELSE            SET P_RESULT = 'The branch number entered already exists.';
END IF;
END $$ CREATE PROCEDURE REGISTER_NEW_CLIENT_SP( IN P_CLIENTNO VARCHAR(50), IN P_FNAME VARCHAR(50), IN P_LNAME VARCHAR(50), IN P_TELNO VARCHAR(15), IN P_STREET VARCHAR(255), IN P_CITY VARCHAR(255), IN P_EMAIL VARCHAR(50), IN P_PREFTYPE VARCHAR(50), IN P_MAXRENT DECIMAL(10, 2), OUT P_RESULT VARCHAR(255) ) BEGIN DECLARE V_CLIENTCOUNT INT;
SELECT          COUNT(*) INTO V_CLIENTCOUNT FROM DH_CLIENT WHERE CLIENTNO = P_CLIENTNO;
IF              V_CLIENTCOUNT = 0 THEN
    INSERT INTO DH_CLIENT (
        CLIENTNO,
        FNAME,
        LNAME,
        TELNO,
        STREET,
        CITY,
        EMAIL,
        PREFTYPE,
        MAXRENT
    ) VALUES (
        P_CLIENTNO,
        P_FNAME,
        P_LNAME,
        P_TELNO,
        P_STREET,
        P_CITY,
        P_EMAIL,
        P_PREFTYPE,
        P_MAXRENT
    );
    SET             P_RESULT = 'New client registered successfully.';
    ELSE            SET P_RESULT = 'The client number entered already exists.';
END IF;
END $$ CREATE PROCEDURE UPDATE_CLIENT_SP( IN P_CLIENTNO VARCHAR(50), IN P_NEW_FNAME VARCHAR(50), IN P_NEW_LNAME VARCHAR(50), IN P_NEW_TELNO VARCHAR(15), IN P_NEW_STREET VARCHAR(255), IN P_NEW_CITY VARCHAR(255), IN P_NEW_EMAIL VARCHAR(50), IN P_NEW_PREFTYPE VARCHAR(50), IN P_NEW_MAXRENT DECIMAL(10, 2), OUT P_RESULT VARCHAR(255) ) BEGIN DECLARE V_CLIENTCOUNT INT;
IF              P_NEW_FNAME IS
    NULL THEN
        SET P_NEW_FNAME = (
            SELECT
                FNAME
            FROM
                DH_CLIENT
            WHERE
                CLIENTNO = P_CLIENTNO
        );
END IF;
IF              P_NEW_LNAME IS
    NULL THEN
        SET P_NEW_LNAME = (
            SELECT
                LNAME
            FROM
                DH_CLIENT
            WHERE
                CLIENTNO = P_CLIENTNO
        );
END IF;
IF              P_NEW_TELNO IS
    NULL THEN
        SET P_NEW_TELNO = (
            SELECT
                TELNO
            FROM
                DH_CLIENT
            WHERE
                CLIENTNO = P_CLIENTNO
        );
END IF;
IF              P_NEW_STREET IS
    NULL THEN
        SET P_NEW_STREET = (
            SELECT
                STREET
            FROM
                DH_CLIENT
            WHERE
                CLIENTNO = P_CLIENTNO
        );
END IF;
IF              P_NEW_CITY IS
    NULL THEN
        SET P_NEW_CITY = (
            SELECT
                CITY
            FROM
                DH_CLIENT
            WHERE
                CLIENTNO = P_CLIENTNO
        );
END IF;
IF              P_NEW_EMAIL IS
    NULL THEN
        SET P_NEW_EMAIL = (
            SELECT
                EMAIL
            FROM
                DH_CLIENT
            WHERE
                CLIENTNO = P_CLIENTNO
        );
END IF;
IF              P_NEW_PREFTYPE IS
    NULL THEN
        SET P_NEW_PREFTYPE = (
            SELECT
                PREFTYPE
            FROM
                DH_CLIENT
            WHERE
                CLIENTNO = P_CLIENTNO
        );
END IF;
IF              P_NEW_MAXRENT IS
    NULL THEN
        SET P_NEW_MAXRENT = (
            SELECT
                MAXRENT
            FROM
                DH_CLIENT
            WHERE
                CLIENTNO = P_CLIENTNO
        );
END IF;
SELECT          COUNT(*) INTO V_CLIENTCOUNT FROM DH_CLIENT WHERE CLIENTNO = P_CLIENTNO;
IF              V_CLIENTCOUNT != 0 THEN
    UPDATE DH_CLIENT SET FNAME = P_NEW_FNAME, LNAME = P_NEW_LNAME, TELNO = P_NEW_TELNO, STREET = P_NEW_STREET, CITY = P_NEW_CITY, EMAIL = P_NEW_EMAIL, PREFTYPE = P_NEW_PREFTYPE, MAXRENT = P_NEW_MAXRENT WHERE CLIENTNO = P_CLIENTNO;
    SET             P_RESULT = 'Information updated successfully!';
    ELSE            SET P_RESULT = 'The client number entered does not exist.';
END IF;
END $$ DELIMITER;