#include <stdio.h>

extern "C" {
    void ResponseWriteBin(void * pHttp, long len , const unsigned char * str);
    void ResponseWrite(void * pHttp, long len , const unsigned char * str);
    void * GetPhttp(void);
};

class ICE_Response {


  public:

     void * pHttp;

     ICE_Response (void) {
         pHttp =  GetPhttp();
     };

     void Write(int val) {
        char str [32];
        int len = sprintf (str, "%d" , val);
        ResponseWrite(pHttp, len , (unsigned char *) str);
     };

     void Write(double val) {
        char str [32];
        int len = sprintf (str, "%f" , val);
        ResponseWrite(pHttp, len , (unsigned char *) str);
     };

     void Write(const char * val) {
        ResponseWrite(pHttp, strlen(val) , (unsigned char *)val);
     };

     void EncTrim(double val) {
        char str [32];
        int len = sprintf (str, "%f" , val);
        ResponseWrite(pHttp, len , (unsigned char *) str);
     };

     void EncTrim(int val) {
        char str [32];
        int len = sprintf (str, "%d" , val);
        ResponseWrite(pHttp, len , (unsigned char *) str);
     };

     void EncTrim(const char * val) {
        ResponseWrite(pHttp, strlen(val) , (unsigned char *)val);
     };

     void WriteBinBlock(const unsigned char * val, long len ) {
        ResponseWriteBin(pHttp , len , val  );
     };
};


static ICE_Response Response;
